import { Prisma, PrismaClient } from "@prisma/client";
import { Product } from "../types/Product";

const client = new PrismaClient();

class Products {
  async getAll() {
    const products = await client.product.findMany();
    return products;
  }

  async getById(id: string) {
    const product = await client.product.findFirst({
      where: {
        id,
      },
    });

    return product;
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const user = await client.product.create({
      data,
    });

    return user;
  }
  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    const product = await client.product.update({
      where: {
        id,
      },
      data,
    });

    return product;
  }

  async delete(id: string) {
    const product = await client.product.delete({
      where: {
        id,
      },
    });

    return product;
  }
}

export default Products;
