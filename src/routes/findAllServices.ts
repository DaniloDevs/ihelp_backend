import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export default async function FindAllServices(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/services", async (request, reply) => {
               const services = await prisma.service.findMany({
                    where: {
                         technicalsId: null
                   }
               })


               return reply.status(200).send({
                    Message: "Todos os serviços foram listados com sucesso",
                    Services: services
               })
          })
}
