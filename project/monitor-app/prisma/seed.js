import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const seed = {
  hosts: [
    {
      id: 1,
      name: 'Google DNS',
      address: '8.8.8.8',
    },
    {
      id: 2,
      name: 'Google Search',
      address: 'www.google.com',
    },
  ],
};

const main = async () => {
  for (const host of seed.hosts) {
    await prisma.host.create({
      data: host,
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
