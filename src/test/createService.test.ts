import { afterAll, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"

afterAll(async () => {
     const client = await prisma.clients.findUnique({ where: { email: "john.doe@example.com" } })

     if (client) {
          await prisma.$transaction([
               prisma.service.deleteMany({ where: { clientsId: client.id } }),
               prisma.clients.delete({ where: { email: "john.doe@example.com" }, }),
               prisma.users.delete({ where: { id: "3024115678" } }),
          ])
     }
})

test('deve ser possivel criar um serviço valido', async () => {
     await server.inject({
          method: "POST",
          url: "/register/client",
          body: {
               id: "3024115678",
               firstName: "John",
               lastName: "Doe",
               email: "john.doe@example.com",
               type: "client"
          }
     })

     const response = await server.inject({
          method: "POST",
          url: `/service`,
          body: {
               clientId: "3024115678",
               serviceType: "bateria com defeito",
               description: "a bateria do meu laptop não está carregando"
          }
     })

     const { Message, Client, Service } = JSON.parse(response.body)

     expect(response.statusCode).toBe(201)
     expect(Message).toBe("Serviço criado com sucesso")
     expect(Client).toBe("John")
     expect(Service).toHaveProperty("serviceType", "bateria com defeito")
})
