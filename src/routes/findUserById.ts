import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function FindUserById(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .get("/user/:id", {
               schema: {
                    params: z.object({
                         id: z.string()
                    })
               }
          }, async (request, reply) => {
               const { id } = request.params
               
               const [
                    client,
                    technical,
               ] = await Promise.all([
                    prisma.client.findUnique({ where: { id } }),
                    prisma.technical.findUnique({ where: { id } }),
               ])

               if (!client && !technical) {
                    // Usuário não encontrado, retorna 404
                    return reply.code(200).send({
                         Message: "Usuário não encontrado",
                         ExistUser: false,
                    });
               }

               // Usuário encontrado, retorna os dados
               const user = client || technical;
               return reply.code(200).send({
                    Message: "Usuário encontrado",
                    ExistUser: true,
                    User: user,
               });

          });
}

