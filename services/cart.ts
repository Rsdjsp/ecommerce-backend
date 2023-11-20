import { PrismaClient, Cart } from "@prisma/client";

const client = new PrismaClient();

class Carts {
  async addProductToCart(userId: string, productId: string): Promise<Cart> {
    let cart = await client.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await client.cart.create({
        data: {
          user: {
            connect: { id: userId },
          },
        },
      });
    }
    const exists = await this.getCartWithProducts(userId);
    if (
      // @ts-ignore
      exists.products.find(
        (product: { id: string }) => product.id === productId
      )
    ) {
      await client.product.update({
        where: { id: productId },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await client.product.update({
        where: { id: productId },
        data: {
          cart: {
            connect: { id: cart.id },
          },
        },
      });
    }

    return cart;
  }

  async removeProductFromCart(
    userId: string,
    productId: string
  ): Promise<Cart | null> {
    const cart = await client.cart.findUnique({
      where: { userId },
    });
    const exists = await this.getCartWithProducts(userId);
    // @ts-ignore
    const product = exists.products.find(
      (product: { id: string }) => product.id === productId
    );
    if (product.quantity > 1) {
      await client.product.update({
        where: { id: productId },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
      return cart;
    }

    if (cart) {
      await client.product.update({
        where: { id: productId },
        data: {
          cart: {
            disconnect: { id: cart.id },
          },
        },
      });
    }

    return cart;
  }

  async getCartWithProducts(userId: string): Promise<Cart | null> {
    const cart = await client.cart.findUnique({
      where: { userId },
      include: {
        products: true,
      },
    });

    return cart;
  }
}

export default Carts;
