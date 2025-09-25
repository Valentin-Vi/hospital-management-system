// backend/prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import hashPassword from "../src/utils/hashPassword";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@mail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin123*";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      password: hashPassword(ADMIN_PASSWORD),
      firstname: "admin",
      lastname: "istrador",
      type: "ADMIN",
      enabled: true,
    },
    update: {
      firstname: "admin",
      lastname: "istrador",
      type: "ADMIN",
      enabled: true,
    },
  });

  if (process.env.ADMIN_PASSWORD) {
    const same = bcrypt.compareSync(ADMIN_PASSWORD, user.password);
    if (!same) {
      await prisma.user.update({
        where: { userId: user.userId },
        data: { password: hashPassword(ADMIN_PASSWORD) },
      });
    }
  }

  await prisma.admin.upsert({
    where: { userId: user.userId },
    create: {
      users: { connect: { userId: user.userId } },
    },
    update: {
      users: { connect: { userId: user.userId } },
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
