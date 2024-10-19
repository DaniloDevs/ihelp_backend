import { afterAll, describe, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"

server.listen({ port: 0 })

afterAll(async () => {
     const client = await prisma.technicals.findUnique({ where: { email: "john.doe@example.com" } })
     if (client) {
          await prisma.technicals.delete({ where: { email: "john.doe@example.com" } })
          await prisma.users.delete({ where: { id: "2023109876" } })
     }

})

test('deve ser possivel criar um tecnico valido', async () => {
     const response = await server.inject({
          method: "POST",
          url: "/register/technical",
          body: {
               id: "2023109876",
               firstName: "John",
               lastName: "Doe",
               email: "john.doe@example.com",
               type: "technical"
          }
     })
     
     const { Message, Technical } = JSON.parse(response.body)

     expect(response.statusCode).toBe(201)
     expect(Message).toBe("Tecnico criado com sucesso")
     expect(Technical).toHaveProperty("firstName", "John")
     expect(Technical).toHaveProperty("type", "technical")
})
