import fastify from "fastify";

const server = fastify()


try {
     server.get("/", () => "Hello Wolrd lulu")

     server.listen({
          port: 3031
     }, ()=> {
          console.log("Server on!!")
     })
} catch (error) {
     server.log.error(error)
     console.log(error)
}