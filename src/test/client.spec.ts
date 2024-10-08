import { server } from './../index';
import { prisma } from '../connection/prisma';
import { afterAll, describe, expect, test } from "vitest";

afterAll(async () => await prisma.client.deleteMany())

describe('Client', () => {

     test('POST /user', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "client_test_1",
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "client.test@exemple.com",
                    gender: "macho",
                    phoneNumber: "1234215431",
                    userType: "client",
               }
          })

          expect(response.statusCode).toBe(201)
     })

     test('GET /user/:id', async () => {
          const clientId = "client_test_1"
          const response = await server.inject({
               method: "GET",
               url: `/user/${clientId}`,
          })

          expect(response.statusCode).toBe(200)
     })
})