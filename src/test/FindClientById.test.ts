import { afterAll, describe, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"

server.listen({ port: 0 })

afterAll(async () => {
     const client = await prisma.clients.findUnique({ where: { email: "bob.johnson@example.com" } })
     if (client) {
          await prisma.clients.delete({ where: { email: "bob.johnson@example.com" } })
          await prisma.users.delete({ where: { id: "2023112345" } })
     }

})

test('deve ser possivel encontrar um cliente por um ID valido', async () => {
     await server.inject({
          method: "POST",
          url: "/register/client",
          body: {
               id: "2023112345",
               firstName: "Bob",
               lastName: "Johnson",
               email: "bob.johnson@example.com",
               type: "client"
          }
     })
     const response = await server.inject({
          method: "get",
          url: `/user/2023112345`,
     })

     const { Message, Client } = JSON.parse(response.body)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe("Usuario encontrado com sucesso")
     expect(Client).toHaveProperty("email", "bob.johnson@example.com")
})
