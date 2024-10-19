import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";


export async function AcceptedService(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/service/:id/accepted", {
               schema: {
                    params: z.object({
                         id: z.string()
                    }),
                    body: z.object({
                         technicalId: z.string()
                    })
               }
          }, async (request, reply) => {
               const { id } = request.params
               const { technicalId } = request.body

               const existService = await prisma.service.findUnique({ where: { id } })

               if (!existService) {
                    return reply.status(400).send({
                         Message: "Não foi encontrar nenhum serviço"
                    })
               }

               const service = await prisma.service.update({
                    where: { id },
                    data: {
                         accepted: true,
                         Technical: {
                              connect: {
                                   id: technicalId
                              }
                         }
                    },
               })

               return reply.status(200).send({
                    Message: "Serviço foi aceito com sucesso",
                    Service: service
               })
          });
}

