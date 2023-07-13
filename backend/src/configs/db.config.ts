import { PrismaClient } from "@prisma/client";

let db = new PrismaClient();

export { db };
