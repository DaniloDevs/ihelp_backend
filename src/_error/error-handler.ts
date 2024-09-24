import { FastifyInstance } from "fastify";
import { ZodError } from 'zod';
import { BadRequest } from './bad-request';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
     // Tratamento de erros de validação Zod
     if (error instanceof ZodError) {
          return reply.status(400).send({
               type: "Zod",
               message: 'Erro de validação de dados',
               errors: error.flatten().fieldErrors,
          });
     }

     // Tratamento de erros do Prisma
     if (error instanceof PrismaClientKnownRequestError) {
          switch (error.code) {
               case "P2002":
                    return reply.status(400).send({
                         message: 'Violações de restrição única detectadas',
                         target: error.meta?.target, // Exibe o campo afetado
                    });
               case "P2003":
                    return reply.status(400).send({
                         message: 'Violações de restrição de chave estrangeira detectadas',
                    });
               default:
                    return reply.status(500).send({
                         message: 'Erro inesperado no banco de dados',
                    });
          }
     }

     // Tratamento de erros personalizados
     if (error instanceof BadRequest) {
          return reply.status(400).send({
               type: "BadRequest",
               message: error.message
          });
     }

     // Tratamento de outros erros
     return reply.status(500).send({ message: 'Erro interno do servidor!' });
};
