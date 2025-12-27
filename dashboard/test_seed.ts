import * as Client from "./src/generated/prisma/client";
console.log(Client);
try {
    const prisma = new Client.PrismaClient();
    console.log("Prisma instance created");
} catch (e) {
    console.error("Error creating instance:", e);
}
