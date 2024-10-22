import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export default async function CreateService(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/service", {
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

               const existService = await prisma.service.findUnique({
                    where: { id },
               })

               if (!existService) {
                    return reply.status(401).send({
                         Message: "Não existe um serviço com o ID informado",
                    })
               }

               await prisma.service.update({
                    where: { id },
                    data: {
                         accepted: true,
                         technical: {
                              connect: {
                                   id: technicalId
                              }
                         }
                    }
               })

              

               return reply.status(201).send({
                    Message: "Serviço foi aceito com sucesso",
               });
          })
}
