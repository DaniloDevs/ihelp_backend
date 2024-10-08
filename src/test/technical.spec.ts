import { server } from '../index';
import { prisma } from '../connection/prisma';
import { afterAll, describe, expect, test } from "vitest";

afterAll(async () => await prisma.technical.deleteMany())

describe('technical', () => {

     test('POST /user', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "technical_test_1",
                    firstName: "Jhon",
                    lastName: "Doe",
                    email: "technical.test@exemple.com",
                    gender: "macho",
                    phoneNumber: "1234215431",
                    userType: "technical",
               }
          })

          expect(response.statusCode).toBe(201)
     })

     test('GET /user/:id', async () => {
          const clientId = "technical_test_1"
          const response = await server.inject({
               method: "GET",
               url: `/user/${clientId}`,
          })

          expect(response.statusCode).toBe(200)
     })
})