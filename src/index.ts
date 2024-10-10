import fastify from "fastify";
import { CreateUser } from "./routes/createUser";
import { FindUserById } from "./routes/findUserById";
import { exit } from 'node:process';
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { errorHandler } from "./_error/error-handler";
<<<<<<< HEAD
import { CreateService } from "./routes/createService";
import { FindServices } from "./routes/findService";
=======
import { FindServices } from "./routes/findService";
import { CreateService } from "./routes/createService";
>>>>>>> 4d4864f37db59c5f0cf37ffbc634c4ace2e121eb

export const server = fastify();


try {
     // Type Provider Zod
     server.setValidatorCompiler(validatorCompiler);
     server.setSerializerCompiler(serializerCompiler);

     // Helper
     server.get("/", (request, reply) => {
          reply.code(200).send("Server Running");
     });

     // Routes
     server.register(CreateUser); //  Client
     server.register(FindUserById);
<<<<<<< HEAD
     server.register(CreateService); // Service
=======
     server.register(CreateService);
>>>>>>> 4d4864f37db59c5f0cf37ffbc634c4ace2e121eb
     server.register(FindServices);

     // Error Handler
     server.setErrorHandler(errorHandler);

     // Start Server
     server.listen({
          port: 3031,
          host: '0.0.0.0',
     }, () => {
          console.log("Server Running!!");
     });
} catch (error) {
     server.log.error(error);
     exit(1);
}

