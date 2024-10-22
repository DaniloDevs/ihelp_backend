import { afterAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../connection/prisma";

afterAll(async () => {
     
     const client = await prisma.clients.findUnique({ where: { email: "alex.johnson@example.com" } });
     const technical = await prisma.technicals.findUnique({ where: { email: "lisa.white@example.com" } });

     if (client && technical) {
          await prisma.$transaction([
               prisma.service.deleteMany({ where: { clientsId: client.id } }),

               prisma.clients.delete({ where: { email: "alex.johnson@example.com" } }),
               prisma.users.delete({ where: { id: "2024115681" } }),

               prisma.technicals.delete({ where: { email: "lisa.white@example.com" } }),
               prisma.users.delete({ where: { id: "2023109880" } })
          ]);
     }
});

test('deve ser possivel que o tecnico aceite um serviço valido', async () => {
     await server.inject({
          method: "POST",
          url: "/register/client",
          body: {
               id: "2024115681",
               firstName: "Alex",
               lastName: "Johnson",
               email: "alex.johnson@example.com",
               type: "client"
          }
     });

     const resTec = await server.inject({
          method: "POST",
          url: "/register/technical",
          body: {
               id: "2023109880",
               firstName: "Lisa",
               lastName: "White",
               email: "lisa.white@example.com",
               type: "technical"
          }
     });

     const res = await server.inject({
          method: "POST",
          url: `/service`,
          body: {
               clientId: "2024115681",
               serviceType: "problema de rede",
               description: "não consigo me conectar à internet"
          }
     });

     const { _, Service } = JSON.parse(res.body);

     const response = await server.inject({
          method: "POST",
          url: `/service/${Service.id}/accepted`,
          body: {
               technicalId: "2023109880",
          }
     })
     
     const { Message } = JSON.parse(response.body);

     expect(response.statusCode).toBe(200);
     expect(Message).toBe("Serviço foi aceito com sucesso");
});
