import jwt from "jsonwebtoken";
import Users from "./users";
import { User } from "../types/User";
import { compare, encrypt } from "../utils/bcrypt";

class Auth {
  async login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    const userService = new Users();

    const user = await userService.getByEmail(email);

    if (user && (await compare(password, user.password))) {
      const token = this.createToken(user);

      return {
        logged: true,
        data: user,
        token,
      };
    }

    return {
      logged: false,
      message: "Invalid Credentials",
    };
  }

  async signup(credentials: User) {
    const userService = new Users();
    credentials.password = await encrypt(credentials.password);
    const user = await userService.create(credentials);

    if (user) {
      const token = this.createToken(user);

      return {
        logged: true,
        data: user,
        token,
      };
    }

    return {
      logged: false,
      message: "Invalid Credentials.",
    };
  }

  createToken(data: any) {
    const token = jwt.sign(data, process.env.JWT_SECRET!);

    return token;
  }
}

export default Auth;
