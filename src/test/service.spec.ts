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
               id: "service_test_1",
               firstName: "Jhon",
               lastName: "Doe",
               email: "service.test@exemple.com",
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
                    clientId: "service_test_1",
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