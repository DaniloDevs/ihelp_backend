import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export async function CreateUser(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/user", {
               schema: {
                    body: z.object({
                         id: z.string(),
                         firstName: z.string(),
                         lastName: z.string(),
                         email: z.string(),
                         gender: z.string(),
                         phoneNumber: z.string(),
                         userType: z.string(),
                         imageUrl: z.string().optional(),
                    })
               }
          }, async (request, reply) => {
               const {
                    id,
                    firstName,
                    lastName,
                    email,
                    gender,
                    phoneNumber,
                    userType,
                    imageUrl
               } = request.body

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
                                   gender,
                                   phoneNumber,
                                   userType,
                                   imageUrl
                              },
                         })

                         return reply.status(201).send({
                              Message: "Usuario criado com sucesso",
                              User: client
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
                                   gender,
                                   phoneNumber,
                                   userType,
                                   imageUrl
                              },
                         })

                         return reply.status(201).send({
                              Message: "Usuario criado com sucesso",
                              User: technical
                         })
               }
          })
}
