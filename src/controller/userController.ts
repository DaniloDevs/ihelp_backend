import { prisma } from "@/utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "@prisma/client";


interface User {
     id: string,
     name: string,
     email: string,
     userType: Role,
}

export class UserController {
     async createUser(request: FastifyRequest, reply: FastifyReply) {
          const { id, name, email, userType } = request.body as User

          const user = await prisma.users.create({
               data: {
                    id, 
                    name,
                    email,
                    userType,
               }
          })

          return reply.code(201).send({
               message: "Usuario foi criado com sucesso",
               user: user
          })
     }

     async findUser(request: FastifyRequest, reply: FastifyReply) {
          const { userId } = request.query as { userId: string }
          const user = await prisma.users.findUnique({ where: { id: userId } })

          if (user) {
               return reply.code(200).send({
                    message: "Usuario encontrado",
                    userId: userId,
                    userExist: true,
                    user: user
               })
          } else {
               return reply.code(400).send({
                    message: "Usuario não encontrado",
                    userId: userId,
                    userExist: false,
               })
          }
     }
}