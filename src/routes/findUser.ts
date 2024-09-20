import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";


export async function FindUser(server: FastifyInstance) {
     server.get("/user/:id", async (request, reply) => {
          const { id } = request.params as { id: string };

          try {
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
                         message: "Usuário não encontrado",
                         existUser: false,
                    });
               }

               // Usuário encontrado, retorna os dados
               const user = client || technical;
               return reply.code(200).send({
                    message: "Usuário encontrado",
                    existUser: true,
                    user: user,
               });
          } catch (error) {
               console.error("Erro ao buscar o usuário:", error);

               return reply.code(500).send({
                    message: "Erro interno ao buscar o usuário",
                    error: error.message,
               });
          }
     });
}

