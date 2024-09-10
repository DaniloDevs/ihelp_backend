import fastify from "fastify";
import { CreateUser } from "./routes/createUser";
import { FindUser } from "./routes/findUser";
import { exit } from 'node:process'
import fastifyCors from "@fastify/cors";

const server = fastify({
     logger: true
})

server.register(fastifyCors, {
     origin: '*',  // Permite qualquer origem
});


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
          host:"10.0.0.120"
     }, () => {
          console.log("Server Running!!")
     })
} catch (error) {
     exit(1)
     server.log.error(error)
}