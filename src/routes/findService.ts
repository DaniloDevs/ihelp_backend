import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function FindServices(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/service", {
               schema: {
                    querystring: z.object({
                         accepted: z.boolean()
                    })
               }
          }, async (request, reply) => {
               const { accepted } = request.query

               if(accepted) {
                    const services = await prisma.service.findMany({
                         where:{
                              accepted
                         }
                    })

                    return reply.status(200).send({
                         message: "Todos os seus serviços foram listados",
                         services: services
                    })
               }

               const services = await prisma.service.findMany()

               return reply.status(200).send({
                    message: "Todos os serviços foram listados",
                    services: services
               })
          });
}

