import { afterAll, expect } from 'vitest';
import { server } from './../index';
import { describe, test } from 'vitest';
import { prisma } from '../connection/prisma';

afterAll(async () => {
     await prisma.technical.delete({ where: { email: "technical@exemple.com" } })
})

describe('technical Routes', () => {
     test('POST /user', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "id_technical",
                    firstName: "Testatndo",
                    lastName: "da silva",
                    email: "technical@exemple.com",
                    gender: "macho",
                    phoneNumber: "34214",
                    userType: "technical",
               }
          })

          const {Message, User} = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe("Usuario criado com sucesso")
          expect(User.firstName).toBe("Testatndo")
     })
     test('POST /user', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "id_technical",
                    firstName: "Test",
                    lastName: "Da cunha",
                    email: "technical@exemple.com",
                    gender: "macho",
                    phoneNumber: "34214",
                    userType: "technical",
               }
          })

          const {Message} = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe("Usuario ja existe")
     })

     test('GET /user/:id', async () => {
          const response = await server.inject({
               method: "GET",
               url: "/user/id_technical"
          })

          const {Message, User} = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Usuário encontrado")
          expect(User.firstName).toBe("Test")
     })
     test('GET /user/:id', async () => {
          const response = await server.inject({
               method: "GET", 
               url: "/user/123142"
          })

          const {Message, ExistUser} = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Usuário não encontrado")
          expect(ExistUser).toBe(false)
     })
})