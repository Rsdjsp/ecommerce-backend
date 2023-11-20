import { PrismaClient } from "@prisma/client";
import { products } from "../src/products.json";
import { encrypt } from "../utils/bcrypt";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      password: await encrypt("password123"),
    },
  });

  const seedProducts = products.map(
    async (product) =>
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity: 1,
        },
      })
  );
  const cart1 = await prisma.cart.create({
    data: {
      user: {
        connect: {
          id: user1.id,
        },
      },
      products: {
        connect: {
          id: (await seedProducts[0]).id,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
