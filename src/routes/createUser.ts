import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"

interface User {
     id: string
     firstName: string
     lastName: string
     email: string
     gender: string
     phoneNumber: string
     userType: string
     imageUrl?: string
}

export async function CreateUser(server: FastifyInstance) {
     server.post("/user", async (request, reply) => {
          const {
               id,
               firstName,
               lastName,
               email,
               phoneNumber,
               userType,
          } = request.body as User

          try {
               switch (userType) {
                    case "client":
                         const existClient = await prisma.client.findUnique({ where: { id } })

                         if (existClient) {
                              return reply.status(401).send({
                                   Message: "Usuario ja existe",
                              })
                         }

                         const client = await prisma.client.create({
                              data: {
                                   id,
                                   firstName,
                                   lastName,
                                   email,
                                   phoneNumber,
                                   userType,
                              },
                         })

                         return reply.status(201).send({
                              message: "Usuario criado com sucesso",
                              user: client
                         })

                    case "technical":
                         const existTechnical = await prisma.technical.findUnique({ where: { id } })

                         if (existTechnical) {
                              return reply.status(401).send({
                                   Message: "Usuario ja existe",
                              })
                         }
                         
                         const technical = await prisma.technical.create({
                              data: {
                                   id,
                                   firstName,
                                   lastName,
                                   email,
                                   phoneNumber,
                                   userType,
                              },
                         })

                         return reply.status(201).send({
                              message: "Usuario criado com sucesso",
                              user: technical
                         })
               }
          } catch (error) {
               console.error("Erro ao criar o usuário:", error);

               return reply.code(500).send({
                    message: "Erro interno ao criar o usuário",
                    error: error.message,
               });
          }
     })
}
