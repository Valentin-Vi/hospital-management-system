import { PrismaClient } from "@prisma/client";
import hashPassword from '../src/utils/hashPassword'

const prisma = new PrismaClient()

async function main() {
  

  const user = await prisma.user.upsert({
    where: { userId: 1 },
    create: {
      email: "admin@mail.com",
      password: hashPassword('Admin123*'),
      firstname: 'admin',
      lastname: 'istrador',
      type: 'ADMIN',
      enabled: true
    },
    update: {
      email: "admin@mail.com",
      password: hashPassword('Admin123*'),
      firstname: 'admin',
      lastname: 'istrador',
      type: 'ADMIN',
      enabled: true  
    }
  })

  await prisma.admin.upsert({
    where: { userId: user.userId },
    create: {
      users: {
        connect: { userId: 1 }
      }
    },
    update: {
      users: {
        connect: { userId: 1 }
      }
    }
  })
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1)
  })
  