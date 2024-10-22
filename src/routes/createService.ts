import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export default async function CreateService(server: FastifyInstance) {
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
               const { clientId, serviceType, description } = request.body


               const client = await prisma.users.findUnique({
                    where: { id: clientId, },
                    include: {
                         clients: {
                              select: {
                                   email: true
                              }
                         }
                    }
               })

               if (!client) {
                    return reply.status(401).send({
                         Message: "Usuario não existe",
                    })
               }


               // Cria o serviço e relaciona com o cliente
               const service = await prisma.service.create({
                    data: {
                         serviceType,
                         description,
                         client: {
                              connect: {
                                   email: client.clients[0].email
                              }
                         }
                    }
               });

               return reply.status(201).send({
                    Message: "Serviço criado com sucesso",
                    Client:  client.firstName,
                    Service: service
               });
          })
}
