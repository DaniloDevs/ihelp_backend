import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai"
import MarkdownIt from 'markdown-it';

interface ExtractedData {
     typeService: string;
     solutions: string[];
 }

function extractSolutions(markdownText: string): ExtractedData {
     const md = new MarkdownIt();
     const ast = md.parse(markdownText, {});

     // Procurar por um bloco de código JSON (geralmente representado pelo tipo 'fence')
     const codeBlock = ast.find(node => node.type === 'fence' && node.info.trim() === 'json');

     if (!codeBlock) {
          throw new Error('Bloco JSON não encontrado');
     }

     try {
          // Parse do conteúdo do bloco JSON
          const parsedContent = JSON.parse(codeBlock.content);

          // Verifica se o JSON tem os campos esperados
          if (!parsedContent.typeService || !parsedContent.solutions) {
               throw new Error('Estrutura JSON inesperada');
          }

          // Mapeando o array de soluções para retornar apenas as strings da chave "solution"
          const solutions: string[] = parsedContent.solutions.map((item: { solution: string }) => item.solution);

          // Retorna o objeto com o tipo de serviço e as soluções
          return {
               typeService: parsedContent.typeService,
               solutions: solutions
          };
     } catch (error) {
          throw new Error('Erro ao parsear JSON: ' + error.message);
     }
}


export async function CreateService(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/service", {
               schema: {
                    body: z.object({
                         clientId: z.string(),
                         serviceType: z.string(),
                         description: z.string()
                    })
               }
          }, async (request, reply) => {
               const {
                    clientId,
                    description,
                    serviceType
               } = request.body

               const client = await prisma.client.findUnique({ where: { id: clientId } })

               if (!client) {
                    return reply.status(400).send({
                         Message: "Não foi encontrar um usuario"
                    })
               }


               const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
               const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

               const prompt = `
          estamos trabalhando com clientes de idades avançadas, precisamos que forneça apenas um JSON que descreva possíveis soluções para um problema técnico. Cujo a descrição do usuario e ${description}, e o tipo do problema e algo relacionado a ${serviceType}. com no tipo de problema que o usuario relatou defina a categoria que mais se relaciona dentre as opções a seguir: celular, computador, tables e notebooks.
Por fim mpreciso que me gere apenas um objeto json sem nenhum tipo de markdow que contenha 3-5 principais soluções para o tal problema, se possivel resuma as soluções ,seu resultado deve seguir a seguinte estrutura apenas: {typeService: (tipo do problema que vc definiu),solutions: [{solution: ""},{solution: ""} , ....]}
               `

               const result = await model.generateContent(prompt);
               const solutions = extractSolutions(result.response.text());



               const service = await prisma.service.create({
                    data: {
                         description,
                         serviceType: solutions.typeService,
                         solution: solutions.solutions,
                         Client: {
                              connect: {
                                   id: clientId
                              }
                         }
                    },
               })

               return reply.status(201).send({
                    Message: "Sucesso ao criar serviço",
                    Service: service
               })
          });
}

