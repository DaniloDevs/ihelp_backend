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
                    clientId: "id_client_test_service",
                    serviceType: "Telefone",
                    description: "Ele quebrou e ta todo fudido"
               }
          })

          const { Message, Service } = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe("Sucesso ao criar serviço")
          expect(Service.description).toBe("Ele quebrou e ta todo fudido")
     })
     test('GET /service', async () => {
          const response = await server.inject({
               method: "GET",
               url: "/service",
          })

          const { Message, Services } = JSON.parse(response.body)
          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Todos os serviços foram listados")
          expect(Services[0].description).toBe("Ele quebrou e ta todo fudido")
     })
})