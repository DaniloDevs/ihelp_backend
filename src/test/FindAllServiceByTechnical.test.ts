import { afterAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../connection/prisma";

afterAll(async () => {
     const client = await prisma.clients.findUnique({ where: { email: "james.bond@example.com" } });
     const technical = await prisma.technicals.findUnique({ where: { email: "natasha.romanoff@example.com" } });

     if (client && technical) {
          await prisma.$transaction([
               prisma.service.deleteMany({ where: { clientsId: client.id } }),
               prisma.clients.delete({ where: { email: "james.bond@example.com" } }),
               prisma.users.delete({ where: { id: "2024115681" } }),
               prisma.technicals.delete({ where: { email: "natasha.romanoff@example.com" } }),
               prisma.users.delete({ where: { id: "2023109880" } })
          ]);
     }
});

test('deve ser possivel listar todos os serviços ativos de um tecnico', async () => {
     const client = await server.inject({
          method: "POST",
          url: "/register/client",
          body: {
               id: "2024115681",
               firstName: "James",
               lastName: "Bond",
               email: "james.bond@example.com",
               type: "client"
          }
     });

     const tec = await server.inject({
          method: "POST",
          url: "/register/technical",
          body: {
               id: "2023109880",
               firstName: "Natasha",
               lastName: "Romanoff",
               email: "natasha.romanoff@example.com",
               type: "technical"
          }
     });

     const res = await server.inject({
          method: "POST",
          url: "/service",
          body: {
               clientId: "2024115681",
               serviceType: "problema de segurança",
               description: "suspeito de atividade maliciosa"
          }
     });

     const { Service } = JSON.parse(res.body);

     const serv = await server.inject({
          method: "POST",
          url: `/service/${Service.id}/accepted`,
          body: {
               technicalId: "2023109880",
          }
     });

     const response = await server.inject({
          method: "GET",
          url: `/services/2023109880`  // Use the correct technicalId
     });

     const { Message, Services } = JSON.parse(response.body);
     console.log(client.body)
     console.log(tec.body)
     console.log(res.body)
     console.log(serv.body)
     console.log(response.body)

     expect(response.statusCode).toBe(200);
     expect(Message).toBe("Todos os serviços foram listados com sucesso");
     expect(Services).toBeDefined();  // Ensure Services is defined
     expect(Services.length).toBeGreaterThan(0);  // Ensure there are services

     const technicalServices = Services[0].technicals[0].service; // Accessing the service data correctly
     expect(technicalServices).toBeDefined(); // Ensure services are defined
     expect(technicalServices.length).toBeGreaterThan(0); // Ensure there are services

     expect(technicalServices[0].description).toBe("suspeito de atividade maliciosa"); // Correct description check
});
