import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export async function RegisterTechnical(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/register/technical", {
               schema: {
                    body: z.object({
                         id: z.string(),
                         firstName: z.string(),
                         lastName: z.string(),
                         email: z.string(),
                         type: z.enum(["client", "technical"]),
                    })
               }
          }, async (request, reply) => {
               const {
                    id,
                    firstName,
                    lastName,
                    email,
                    type
               } = request.body


               const existUsers = await prisma.users.findUnique({ where: { id } })

               if (existUsers) {
                    return reply.status(401).send({
                         Message: "Usuario ja existe",
                    })
               }

               await prisma.users.create({
                    data: {
                         id,
                         firstName,
                         lastName,
                         type,
                         technicals: {
                              create: {
                                   email,
                              }
                         }
                    },
               })

               return reply.status(201).send({
                    Message: "Tecnico criado com sucesso",
                    Technical: {
                         id,
                         firstName,
                         lastName,
                         email,
                         type
                    }
               })
          })
}
