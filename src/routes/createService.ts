import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";


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

               if(!client) {
                    return reply.status(400).send({
                         Message: "Não foi encontrar um usuario"
                    })
               }

               const service = await prisma.service.create({
                    data: {
                         description,
                         serviceType,
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

