import { afterAll, describe, expect, test } from "vitest"
import { server } from ".."
import { prisma } from "../connection/prisma"


afterAll(async () => {
     const client = await prisma.technicals.findUnique({ where: { email: "emma.williams@example.com" } })
     if (client) {
          await prisma.technicals.delete({ where: { email: "emma.williams@example.com" } })
          await prisma.users.delete({ where: { id: "2023123456" } })
     }

})

test('deve ser possivel encontrar um tecnico por um ID valido', async () => {
     await server.inject({
          method: "POST",
          url: "/register/technical",
          body: {
               id: "2023123456",
               firstName: "Emma",
               lastName: "Williams",
               email: "emma.williams@example.com",
               type: "technical"
          }
     })

     const response = await server.inject({
          method: "GET",
          url: `/user/2023123456`,
     })

     const { Message, Technical } = JSON.parse(response.body)

     expect(response.statusCode).toBe(200)
     expect(Message).toBe("Usuario encotrado com sucesso")
     expect(Technical).toHaveProperty("email", "emma.williams@example.com")
})
