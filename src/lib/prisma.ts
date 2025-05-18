import { PrismaClient } from "@prisma";
import { _env } from "@/env";

export const prisma = new PrismaClient({
  log: _env.NODE_ENV === "dev" ? ["query"] : [],
});
