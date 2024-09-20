import { prisma } from "./../connection/prisma";
import { FastifyInstance } from "fastify";

interface IService {
     clientId: string
     serviceType: String
     description: String
}

export async function FindUser(server: FastifyInstance) {
     server.get("/service", async (request, reply) => {
          const {
               clientId,
               description,
               serviceType
          } = request.body as IService

          const 

     });
}

