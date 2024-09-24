import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";


export async function CreateService(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post("/service", {
               schema: {
                    body: z.object({
                         clientId: z.string(),
                         serviceType: z.string(),
                         description: z.string()
                    })
               }
          }, async (request, reply) => {
               const {
                    clientId,
                    description,
                    serviceType
               } = request.body


               const service = await prisma.service.create({
                    data: {
                         clientId,
                         description,
                         serviceType,

                    },
               })

               return reply.status(201).send({
                    message: "Sucesso ao criar serviço",
                    service: service
               })
          });
}

