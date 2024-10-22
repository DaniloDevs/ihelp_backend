import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "./../connection/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"


export default async function FindAllServiceByTechnical(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/services/:technicalId", {
               schema: {
                    params: z.object({
                         technicalId: z.string()
                    })
               }
          }, async (request, reply) => {
               const { technicalId } = request.params

               const technical = await prisma.users.findUnique({
                    where: { id: technicalId },
                    include: {
                         technicals: true
                    }
               });

               if (!technical) {
                    return reply.status(404).send({ message: "Técnico não encontrado" });
               }

               const services = await prisma.service.findMany({
                    where: {
                         technicalsId: technical.technicals[0].id,  
                         accepted: true,             
                    },
               });

               return reply.status(200).send({
                    Message: "Todos os serviços foram listados com sucesso",
                    Services: services,
               });
          })
}
