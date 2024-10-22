import { afterAll, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../connection/prisma";

afterAll(async () => {
     const client = await prisma.clients.findUnique({ where: { email: "bruce.wayne@example.com" } });
     const technical = await prisma.technicals.findUnique({ where: { email: "tony.stark@example.com" } });

     if (client && technical) {
          await prisma.$transaction([
               prisma.service.deleteMany({ where: { clientsId: client.id } }),
               prisma.clients.delete({ where: { email: "bruce.wayne@example.com" } }),
               prisma.users.delete({ where: { id: "3024115681" } }),
               prisma.technicals.delete({ where: { email: "tony.stark@example.com" } }),
               prisma.users.delete({ where: { id: "3023109880" } })
          ]);
     }
});

test('deve ser possivel listar todos os serviços ativos de um tecnico', async () => {
     // Registro do cliente
     const clientResponse = await server.inject({
          method: "POST",
          url: "/register/client",
          body: {
               id: "3024115681",
               firstName: "Bruce",
               lastName: "Wayne",
               email: "bruce.wayne@example.com",
               type: "client"
          }
     });
     expect(clientResponse.statusCode).toBe(201);

     // Registro do técnico
     const technicalResponse = await server.inject({
          method: "POST",
          url: "/register/technical",
          body: {
               id: "3023109880",
               firstName: "Tony",
               lastName: "Stark",
               email: "tony.stark@example.com",
               type: "technical"
          }
     });
     expect(technicalResponse.statusCode).toBe(201);

     // Criação de um serviço
     const serviceResponse = await server.inject({
          method: "POST",
          url: "/service",
          body: {
               clientId: "3024115681",
               serviceType: "problema de sistema",
               description: "falha nos sistemas de segurança da mansão"
          }
     });
     expect(serviceResponse.statusCode).toBe(201);

     const { Service } = JSON.parse(serviceResponse.body);

     // Aceitação do serviço pelo técnico
     const serviceAcceptResponse = await server.inject({
          method: "POST",
          url: `/service/${Service.id}/accepted`,
          body: {
               technicalId: "3023109880"
          }
     });
     expect(serviceAcceptResponse.statusCode).toBe(200);

     const acceptedService = JSON.parse(serviceAcceptResponse.body);

     // Busca dos serviços aceitos do técnico
     const listServicesResponse = await server.inject({
          method: "GET",
          url: `/services/3023109880`
     });
     expect(listServicesResponse.statusCode).toBe(200);

     const { Message, Services } = JSON.parse(listServicesResponse.body);

     // Validações
     expect(Message).toBe("Todos os serviços foram listados com sucesso");
     expect(Services).toBeInstanceOf(Array);
     expect(Services.length).toBeGreaterThan(0);
     expect(Services[0].accepted).toBe(true);
});
