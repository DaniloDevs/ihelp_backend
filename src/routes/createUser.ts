import { prisma } from './../connection/prisma';
import { FastifyInstance } from "fastify";

interface IUserRequest {
     userId: string
     primeiroNome: string
     segundoNome: string
     email: string
     idade: string
     numeroTelefone: string
     tipoUser: string
     imageUrl: string
}

export function CreateUser(server: FastifyInstance) {
     server.post("/", async (request, reply) => {

          const {
               userId,
               primeiroNome,
               segundoNome,
               email,
               idade,
               numeroTelefone,
               imageUrl
          } = request.body as IUserRequest

          const userExist = await prisma.users.findUnique({ where: { email } })
          if (userExist) {
               return reply.status(401).send({
                    Message: "Usuario ja existe"
               })
          }

          const user = await prisma.users.create({
               data: {
                    id: userId,
                    primeiroNome,
                    segundoNome,
                    email,
                    idade,
                    numeroTelefone,
                    imageUrl
               }
          })

          return reply.status(201).send(user)
     })
}