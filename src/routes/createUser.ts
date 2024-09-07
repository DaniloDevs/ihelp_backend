import { UserType } from "@prisma/client"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"

interface User {
     id: string
     firstName: string
     lastName: string
     email: string
     age: string
     phoneNumber?: string
     userType: UserType
     imageUrl?: string
}

export async function CreateUser(server: FastifyInstance) {
     server.post("/user", async (request, reply) => {
          const {
               id,
               firstName,
               lastName,
               email,
               age,
               phoneNumber,
               userType,
          } = request.body as User

          try {
               const existUser = await prisma.users.findUnique({ where: { email } })
               if (existUser) {
                    return reply.status(401).send({
                         Message: "Usuario ja existe",
                    })
               }

               const user = await prisma.users.create({
                    data: {
                         id,
                         firstName,
                         lastName,
                         email,
                         age,
                         phoneNumber,
                         userType,
                    },
               })

               return reply.status(201).send({
                    message: "Usuario criado com sucesso",
                    user: user
               })
          } catch (error) {
               console.error("Erro ao criar o usuário:", error);

               return reply.code(500).send({
                    message: "Erro interno ao criar o usuário",
                    error: error.message,
               });
          }
     })
}
