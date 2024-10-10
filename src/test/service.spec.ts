import { server } from './../index';
import { prisma } from '../connection/prisma';
import { afterAll, describe, expect, test } from "vitest";

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
import { prisma } from '../connection/prisma';
import { server } from './../index';
import { test, describe, afterAll, beforeAll, expect } from "vitest";

beforeAll(async () => {
     await server.inject({
          method: "POST",
          url: "/user",
          body: {
               id: "id_client_test_service",
               firstName: "Danilo",
               lastName: "Romão",
               email: "test",
               gender: "homen",
               phoneNumber: "123143151",
               userType: "client"
          }
     })
})

afterAll(async () => {
     await prisma.service.deleteMany({ where: { description: "descrição aleatoria para test service" } })
     await prisma.client.deleteMany({ where: { id: "id_client_test_service" } })
})

describe('Services Routes', () => {
     test('POST /service', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/service",
               body: {
                    clientId: "id_client_test_service",
                    description: "descrição aleatoria para test service",
                    serviceType: "celular"
               }
          })

          const { Message, Service } = JSON.parse(response.body)
          
          expect(response.statusCode).toBe(201)
          expect(Message).toBe("Sucesso ao criar serviço")
          expect(Service.description).toBe("descrição aleatoria para test service")
     })
     
     test('POST /service', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/service",
               body: {
                    clientId: "id_client_service",
                    description: "descrição aleatoria para test service",
                    serviceType: "celular"
               }
          })

          const { Message } = JSON.parse(response.body)
          
          expect(response.statusCode).toBe(400)
          expect(Message).toBe("Não foi encontrar um usuario")
     })

     test('GET /service',async () => {
          const response = await server.inject({
               method: "GET",
               url: "/service",
          })

          const { Message, Services } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Todos os serviços foram listados")
          expect(Services[0].description).toBe("descrição aleatoria para test service")
     })
})
