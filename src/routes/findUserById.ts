import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function FindUserById(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/user/:id", {
               schema: {
                    params: z.object({
                         id: z.string()
                    })
               }
          }, async (request, reply) => {
               const { id } = request.params 

               try {
                    const [
                         client,
                         technical,
                    ] = await Promise.all([
                         prisma.client.findUnique({ where: { id } }),
                         prisma.technical.findUnique({ where: { id } }),
                    ])

                    if (!client && !technical) {
                         // Usuário não encontrado, retorna 404
                         return reply.code(200).send({
                              message: "Usuário não encontrado",
                              existUser: false,
                         });
                    }

                    // Usuário encontrado, retorna os dados
                    const user = client || technical;
                    return reply.code(200).send({
                         message: "Usuário encontrado",
                         existUser: true,
                         user: user,
                    });
               } catch (error) {
                    console.error("Erro ao buscar o usuário:", error);

                    return reply.code(500).send({
                         message: "Erro interno ao buscar o usuário",
                         error: error.message,
                    });
               }
          });
}

