import { afterAll, describe, expect, test } from "vitest";
import { prisma } from "../connection/prisma";
import { server } from "..";



afterAll(async () => {
     await prisma.client.delete({ where: { email: "gilberto_test@exemple" } })
     await prisma.technical.delete({ where: { email: "Nunes_test@exemple" } })
})

describe('User Routes', () => {
     test('Deveria ser possivel criar um usuario', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "id_client_test",
                    firstName: "Gilberto",
                    lastName: "Cunha",
                    email: "gilberto_test@exemple",
                    gender: "macho",
                    phoneNumber: "123412431",
                    userType: "client",
               }
          })

          const { Message, User } = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe("Usuario criado com sucesso")
          expect(User.firstName).toBe("Gilberto")
     })

     test('Não deveria ser possivel criar um usuario ja existente', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "id_client_test",
                    firstName: "Gilberto",
                    lastName: "Cunha",
                    email: "gilberto_test@exemple",
                    gender: "macho",
                    phoneNumber: "123412431",
                    userType: "client",
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe("Usuario ja existe")
     })
     test('Deveria ser possivel criar um tecnico', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "id_technical_test",
                    firstName: "Nunes",
                    lastName: "Cunha",
                    email: "Nunes_test@exemple",
                    gender: "macho",
                    phoneNumber: "123412431",
                    userType: "technical",
               }
          })

          const { Message, User } = JSON.parse(response.body)

          expect(response.statusCode).toBe(201)
          expect(Message).toBe("Usuario criado com sucesso")
          expect(User.firstName).toBe("Nunes")
     })

     test('Não deveria ser possivel criar um tecnico ja existente', async () => {
          const response = await server.inject({
               method: "POST",
               url: "/user",
               body: {
                    id: "id_technical_test",
                    firstName: "Nunes",
                    lastName: "Cunha",
                    email: "Nunes_test@exemple",
                    gender: "macho",
                    phoneNumber: "123412431",
                    userType: "client",
               }
          })

          const { Message } = JSON.parse(response.body)

          expect(response.statusCode).toBe(401)
          expect(Message).toBe("Usuario ja existe")
     })

     test('Deveria ser possivel encontrar um user pelo id', async () => {
          const response = await server.inject({
               method: "GET",
               url: "/user/id_client_test",
          })

          const { Message, ExistUser, User } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Usuário encontrado")
          expect(ExistUser).toBe(true)
          expect(User.firstName).toBe("Gilberto")
     })
     test('Não deveria ser possivel encontrar um user pelo id que não existe', async () => {
          const response = await server.inject({
               method: "GET",
               url: "/user/id_client",
          })

          const { Message, ExistUser, User } = JSON.parse(response.body)

          expect(response.statusCode).toBe(200)
          expect(Message).toBe("Usuário não encontrado")
          expect(ExistUser).toBe(false)
     })
})