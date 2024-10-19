import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export async function FindUserById(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/user/:id", {
               schema: {
                    params: z.object({
                         id: z.string(),
                    })
               }
          }, async (request, reply) => {
               const { id } = request.params


               const user = await prisma.users.findUnique({ where: { id } })

               if (!user) {
                    return reply.status(401).send({
                         Message: "Usuario não existe",
                    })
               }

               switch (user.type) {
                    case "client":
                         const client = await prisma.users.findUnique({
                              where: { id },
                              select: {
                                   firstName: true,
                                   lastName: true,
                                   type: true,
                                   clients: {
                                        where: { usersId: id },
                                        select: {
                                             email: true
                                        }
                                   }
                              }
                         })


                         return reply.status(200).send({
                              Message: "Usuario encontrado com sucesso",
                              Client: {
                                   firstName: client?.firstName,
                                   lastName: client?.lastName,
                                   email: client?.clients[0].email,
                                   type: client?.type,
                              }
                         })

                     case "technical":
                         const technical = await prisma.users.findUnique({
                              where: { id },
                              select: {
                                   firstName: true,
                                   lastName: true,
                                   type: true,
                                   technicals: {
                                        where: { usersId: id },
                                        select: {
                                             email: true
                                        }
                                   }
                              }
                         })


                         return reply.status(200).send({
                              Message: "Usuario encotrado com sucesso",
                              Technical: {
                                   firstName: technical?.firstName,
                                   lastName: technical?.lastName,
                                   email: technical?.technicals[0].email,
                                   type: technical?.type,
                              }
                         })
               }
          })
}
