import fastify from "fastify";
import { CreateUser } from "./routes/createUser";
import { FindUser } from "./routes/findUser";
import { exit } from 'node:process'

const server = fastify({
     logger: false
})

try {
     server.get("/", (request, reply) => {
          reply.code(200).send("Server Running")
     })

     // Rotas
     server.register(CreateUser)
     server.register(FindUser)


     //Server
     server.listen({
          port: 3031,
     }, () => {
          console.log("Server Running!!")
     })
} catch (error) {
     exit(1)
     server.log.error(error)
}