import fastify from "fastify";
import { CreateUser } from "./routes/createUser";
import { FindUser } from "./routes/findUser";


const server = fastify({
     logger: false
})

server.get("/", (request, reply) => {
     reply.code(200).send("Server Running")
})

server.register(CreateUser)
server.register(FindUser)


server.listen({
     port: 3031,
     host: "10.0.5.222"
}, () => {
     console.log("Server Running!!")
})