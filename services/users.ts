import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "../types/User";
const client = new PrismaClient();

class Users {
  async getAll() {
    const users = await client.user.findMany();
    return users;
  }

  async getByEmail(email: string) {
    const user = await client.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await client.user.create({
      data,
    });

    const cart = await client.cart.create({
      data: {
        user: {
          connect: { id: user.id },
        },
      },
    });

    return user;
  }

  async delete(idUser: string) {
    const user = await client.user.delete({
      where: {
        id: idUser,
      },
    });

    return user;
  }
}

export default Users;
