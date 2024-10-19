import fastify from "fastify";
import { CreateUser } from "./routes/createUser";
import { FindUserById } from "./routes/findUserById";
import { exit } from 'node:process';
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { errorHandler } from "./_error/error-handler";
import { CreateService } from "./routes/createService";
import { FindServicesById } from "./routes/findServiceById";
import { AcceptedService } from "./routes/acceptedService";

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
     server.register(CreateService); // Service
     server.register(FindServicesById);
     server.register(AcceptedService);

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

