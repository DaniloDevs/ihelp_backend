import { server } from '../index';
import { prisma } from '../connection/prisma';
import { afterAll, describe, expect, test } from "vitest";

afterAll(async () => await prisma.technical.deleteMany())

describe('Technical', () => {

     test('POST /user', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "technical1",
                    firstName: "Jhon",
                    lastName: "Doe",
                    email: "test.exemple@.com",
                    gender: "macho",
                    phoneNumber: "1234215431",
                    userType: "technical",
               }
          })

          expect(response.statusCode).toBe(201)
     })

     test('GET /user/:id', async () => {
          const clientId = "technical1"
          const response = await server.inject({
               method: "GET",
               url: `/user/${clientId}`,
          })

          expect(response.statusCode).toBe(200)
     })
})