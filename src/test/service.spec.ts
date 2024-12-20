import { afterAll, describe, test, expect } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"


afterAll(async () => await prisma.$transaction([
     prisma.client.delete({ where: { id: "id_client_test_service" } }),
     prisma.technical.delete({ where: { email: "serv.test@exemple.com" } }),
     prisma.service.deleteMany({ where: { description: "tela travada depois de cair agua" } }),
]))

describe('Service Routes', async () => {
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


     const response = await server.inject({
          method: "POST",
          url: "/user",
          body: {
               id: "id_technical_test_service",
               firstName: "Jhon",
               lastName: "Doe",
               email: "serv.test@exemple.com",
               gender: "macho",
               phoneNumber: "1234215431",
               userType: "technical",
          }
     })

     let serviceId: any
     test('POST /service', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/service",
               body: {
                    clientId: "id_client_test_service",
                    serviceType: "celular",
                    description: "tela travada depois de cair agua"
               }
          })
          

          const { Message, Service } = JSON.parse(response.body)
          serviceId = Service.id
          expect(response.statusCode).toBe(201)
          expect(Message).toBe("Sucesso ao criar serviço")
          expect(Service.serviceType).toBe("celular")
          expect(Service.accepted).toBe(false)
     })

     test('POST /service', async () => {
          const response = await server.inject({
               method: "POST",
               url: `/service/${serviceId}/accepted`,
               body: {
                    technicalId: "id_technical_test_service",
               }
          })

        
          const { Message, Service } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Service.accepted).toBe(true)
     })
})