import { afterAll, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"

server.listen({ port: 0 })

afterAll(async () => {
     const client = await prisma.clients.findUnique({ where: { email: "alice.smith@example.com" } })
     if (client) {
          await prisma.clients.delete({ where: { email: "alice.smith@example.com" } })
          await prisma.users.delete({ where: { id: "2024115678" } })
     }

})

test('deve ser possivel criar um serviço valido', async () => {
     await server.inject({
          method: "POST",
          url: "/register/client",
          body: {
               id: "2024115678",
               firstName: "Alice",
               lastName: "Smith",
               email: "alice.smith@example.com",
               type: "client"
          }
     })

     const response = await server.inject({
          method: "POST",
          url: `/service`,
          body: {
               clientId: "2024115678",
               serviceType: "tela quebrada",
               description: "meu celular caiu no chão e rachou a tela"
          }
     })

     
     const { Message, Client, Service } = JSON.parse(response.body)

     expect(response.statusCode).toBe(201)
     expect(Message).toBe("Serviço criado com sucesso")
     expect(Client).toBe("Alice")
     expect(Service).toHaveProperty("serviceType", "tela quebrada")
})
