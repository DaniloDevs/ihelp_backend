import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export default async function AcceptedService(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/service/:id/accepted", {
               schema: {
                    params: z.object({
                         id: z.string(),
                    }),
                    body: z.object({
                         technicalId: z.string(),
                    }),
               }
          }, async (request, reply) => {
               const { id } = request.params
               const { technicalId } = request.body

               const existTechnical = await prisma.users.findUnique({
                    where: { id: technicalId, },
                    include: {
                         technicals: {
                              select: {
                                   id: true
                              }
                         }
                    }
               })

               const existService = await prisma.service.findUnique({
                    where: { id },
               })

               if (!existTechnical) {
                    return reply.status(404).send({
                         Message: "Não existe um técnico com o ID informado",
                    });
               }


               if (!existService) {
                    return reply.status(401).send({
                         Message: "Não existe um serviço com o ID informado",
                    })
               }

               try {
                    const service = await prisma.service.update({
                         where: { id },
                         data: {
                              accepted: true,
                              technical: {
                                   connect: {
                                        id: existTechnical.technicals[0].id
                                   }
                              }
                         }
                    });

                    return reply.status(200).send({
                         Message: "Serviço foi aceito com sucesso",
                         Accepted: service
                    });
               } catch (error) {
                    console.error("Erro ao aceitar o serviço:", error); // Log do erro para depuração

                    return reply.status(500).send({
                         Message: "Ocorreu um erro ao aceitar o serviço. Tente novamente mais tarde.",
                    });
               }
          })
}
