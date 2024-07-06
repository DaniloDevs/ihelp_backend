
import { UserController } from "@/controller/userController";
import { FastifyInstance } from "fastify";


export async function userRoutes(server: FastifyInstance) {
     const controller = new UserController()

     server.get("/finduser", controller.findUser.bind(controller))
     server.post("/createuser", controller.createUser.bind(controller))
}