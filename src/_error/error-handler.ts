import { FastifyInstance } from "fastify";
import { ZodError } from 'zod'
import { BadRequest } from './bad-request'
import { PrismaClientKnownRequestError, } from "@prisma/client/runtime/library";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
     if (error instanceof ZodError) {
          return reply.status(400).send({
               type: "Zod",
               message: 'Há uma violação de tipagem do dado',
               errors: error.flatten().fieldErrors,
          })
     }

     if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2003") {
               return reply.status(400).send({
                    message: 'Há uma violação de restrição única',
               })
          }
     }

     if (error instanceof BadRequest) {
          return reply.status(400).send({ 
               type: "unknown",
               message: error.message 
          })
     }

     return reply.status(500).send({ message: 'Internal server error!' })
}