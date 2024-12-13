import { PrismaClient, StockStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.stock.deleteMany();
  await prisma.product.deleteMany();

  const mockProducts = [
    {
      name: 'Game Card 100 coins',
      price: new Decimal(100),
      denomination: new Decimal(100),
      imageUrl: '/images/icon-gacha.png',
      description: 'Virtual currency card for gaming',
      stocks: {
        create: [
          {
            code: 'ABC123',
            status: StockStatus.IN_STOCK,
          },
        ],
      },
    },
    {
      name: 'Game Card 300 coins',
      price: new Decimal(300),
      denomination: new Decimal(300),
      imageUrl: '/images/icon-fornite.png',
      description: 'Virtual currency card for gaming',
      stocks: {
        create: [
          {
            code: 'DEF456',
            status: StockStatus.IN_STOCK,
          },
        ],
      },
    },
    {
      name: 'Game Card 500 coins',
      price: new Decimal(500),
      denomination: new Decimal(500),
      imageUrl: '/images/icon-freefire.png',
      description: 'Virtual currency card for gaming',
      stocks: {
        create: [
          {
            code: 'GHI789',
            status: StockStatus.IN_STOCK,
          },
        ],
      },
    },
    {
      name: 'Game Card 1000 coins',
      price: new Decimal(1000),
      denomination: new Decimal(1000),
      imageUrl: '/images/icon-pubg.png',
      description: 'Virtual currency card for gaming',
      stocks: {
        create: [
          {
            code: 'JKL012',
            status: StockStatus.IN_STOCK,
          },
        ],
      },
    },
  ];

  console.log('Starting to seed...');

  for (const productData of mockProducts) {
    try {
      const product = await prisma.product.create({
        data: productData,
        include: {
          stocks: true,
        },
      });
      console.log(`Created product with id: ${product.id}`);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
