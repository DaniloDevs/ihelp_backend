import { afterAll, describe, test, expect } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"


afterAll(async () => await prisma.$transaction([
     prisma.service.deleteMany({ where: { description: "Ele quebrou e ta todo fudido" } }),
     prisma.client.delete({ where: { id: "id_client_test_service" } })
]))

describe('Service', async () => {
     await server.inject({
          method: "POST",
          url: "/user",
          body: {
               id: "id_client_test_service",
               firstName: "Jhon",
               lastName: "Doe",
               email: "service.test@exemple.com",
               gender: "macho",
               phoneNumber: "1234215431",
               userType: "client",
          }
     })

})