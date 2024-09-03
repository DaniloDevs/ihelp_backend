import { prisma } from "./../connection/prisma"
import { errorCodes, FastifyInstance } from "fastify"


export async function FindUser(server: FastifyInstance) {
     server.get("/user/:id", async (request, reply) => {
          const { id } = request.params as { id: string }

          const user = await prisma.users.findUnique({ where: { id } })

          if (!user) { reply.code(400)}
          
          return reply.status(201).send(user)
     })
}
