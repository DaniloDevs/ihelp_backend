import { prisma } from "./../connection/prisma"
import { errorCodes, FastifyInstance } from "fastify"


export async function FindUser(server: FastifyInstance) {
     server.get("/user/:id", async (request, reply) => {
          const { id } = request.params as { id: string }

          const user = await prisma.users.findUnique({ where: { id } })

          if (!user) {
               reply.code(200).send({
                    message: "Usuario nao encontrado",
                    existUser: false
               } )
          }

          return reply.status(200).send({
               message: "Usuario  encontrado",
               existUser: true,
               user
          })
     })
}
