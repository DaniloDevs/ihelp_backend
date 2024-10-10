import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";

export async function FindServices(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/service", {
               schema: { }
          }, async (request, reply) => {

               const services = await prisma.service.findMany()

               return reply.status(200).send({
                    Message: "Todos os serviços foram listados",
                    Services: services
               })
          });
}

