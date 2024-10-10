import { afterAll, describe, test, expect } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"


afterAll(async () => await prisma.$transaction([
     prisma.service.deleteMany(),
     prisma.client.deleteMany()
]))

describe('Service', async () => {
     await server.inject({
          method: "POST",
          url: "/user",
          body: {
               id: "clienttest2",
               firstName: "Jhon",
               lastName: "Doe",
               email: "test.exemple@.com",
               gender: "macho",
               phoneNumber: "1234215431",
               userType: "client",
          }
     })

     test('POST /service', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/service",
               body: {
                    clientId: "clienttest2",
                    serviceType: "Telefone",
                    description: "Ele quebrou e ta todo fudido"
               }
          })

          expect(response.statusCode).toBe(201)
     })

     test('GET /service', async () => {
          const response = await server.inject({
               method: "GET",
               url: "/service"
          })

          expect(response.statusCode).toBe(200)
          
     })
})