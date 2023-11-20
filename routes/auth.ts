import Auth from "../services/auth";
import { Router } from "express";

function auth() {
  const router = Router();

  const authService = new Auth();

  router.post("/login", async (req, res) => {
    const user = await authService.login(req.body);

    return res
      .cookie("token", user.token, {
        httpOnly: true,
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        secure: false,
      })
      .json(user);
  });
  router.post("/signup", async (req, res) => {
    const user = await authService.signup(req.body);

    return res
      .cookie("token", user.token, {
        httpOnly: true,
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        secure: false,
      })
      .json(user);
  });
  return router;
}

export default auth;
