import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo123", 10);

  await prisma.user.upsert({
    where: { email: "demo@driven.com.br" },
    update: {},
    create: {
      name: "Demo",
      email: "demo@driven.com.br",
      password: passwordHash,
    },
  });

  console.log('Usuário de demonstração criado!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
