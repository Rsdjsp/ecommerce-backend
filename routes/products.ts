import Products from "../services/products";
import Carts from "../services/cart";
import { Router } from "express";

function products() {
  const router = Router();

  const productService = new Products();
  const cartService = new Carts();

  router.get("/", async (req, res) => {
    const products = await productService.getAll();
    return res.status(200).json(products);
  });
    
  router.get("/details/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productService.getById(id);
    return res.status(200).json(product);
  });

  router.post("/", async (req, res) => {
    const users = await productService.create(req.body);
    return res.status(200).json(users);
  });

  router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productService.update(id, req.body);
    return res.json(product);
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const users = await productService.delete(id);
    return res.json(users);
  });

  router.post("/addCart", async (req, res) => {
    const { userId, productId } = req.body;
    const cart = await cartService.addProductToCart(userId, productId);
    return res.status(200).json(cart);
  });

  router.post("/removeCart", async (req, res) => {
    const { userId, productId } = req.body;
    const cart = await cartService.removeProductFromCart(userId, productId);
    return res.status(200).json(cart);
  });

  router.get("/cart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const cart = await cartService.getCartWithProducts(userId);
    return res.status(200).json(cart);
  });

  return router;
}

export default products;
