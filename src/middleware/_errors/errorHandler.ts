import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyInstance } from 'fastify'
import { BadRequest } from './errors/badRequest'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

     if (error instanceof PrismaClientKnownRequestError) {
          request.log.error('Erro conhecido do Prisma:', error.message)

          switch (error.code) {
               case 'P2002': // Unique constraint failed
                    return reply.status(409).send({
                         statusCode: 409,
                         error: 'Conflito',
                         message: 'Restrição única violada',
                    });

               default:
                    return reply.status(500).send({
                         statusCode: 500,
                         error: 'Database Error',
                         message: 'Ocorreu um erro desconhecido no banco de dados',
                    });
          }
     }

     if (error instanceof BadRequest) {
          request.log.error('Erro de requisição inválida:', error.message);

          return reply.status(400).send({
               statusCode: 400,
               error: 'Bad Request',
               message: error.message,
          });
     }


     request.log.error('Erro desconhecido:', error);

     return reply.status(500).send({
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'Ocorreu um erro desconhecido',
     });
}