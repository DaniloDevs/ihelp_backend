import { afterAll, describe, expect, test } from "vitest";
import { server } from "..";
import { prisma } from "../connection/prisma";

afterAll(async () => {
    const client = await prisma.clients.findUnique({ where: { email: "bob.brown@example.com" } });
    if (client) {
        await prisma.$transaction([
            prisma.clients.delete({ where: { email: "bob.brown@example.com" } }),
            prisma.users.delete({ where: { id: "2023105433" } }),
        ])
    }
});

test('deve ser possivel criar um cliente valido', async () => {
    const response = await server.inject({
        method: "POST",
        url: "/register/client",
        body: {
            id: "2023105433",
            firstName: "Bob",
            lastName: "Brown",
            email: "bob.brown@example.com",
            type: "client"
        }
    });

    const { Message, Client } = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(Message).toBe("Usuario criado com sucesso");
    expect(Client).toHaveProperty("firstName", "Bob");
    expect(Client).toHaveProperty("email", "bob.brown@example.com");
});
