import fastify from "fastify";
import { CreateUser } from "./routes/createUser";
import { FindUser } from "./routes/findUser";
import { exit } from 'node:process'
import fastifyCors from "@fastify/cors";

const server = fastify({
     logger: true
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
          host: '0.0.0.0'
     }, () => {
          console.log("Server Running!!")
     })
} catch (error) {
     server.log.error(error)
     exit(1)
}