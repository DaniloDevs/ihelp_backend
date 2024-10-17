import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function FindServicesById(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/:id/services", {
               schema: {
                    params: z.object({
                         id: z.string()
                    })
               }
          }, async (request, reply) => {
               const { id } = request.params

               const services = await prisma.service.findMany({
                    where: {
                         clientId: id
                    }
               })

               return reply.status(200).send({
                    Message: "Todos os serviços foram listados",
                    Services: services
               })
          });
}

