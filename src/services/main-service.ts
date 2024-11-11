import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import userService from "./user-service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MainService {
  async register(name: string, email: string, password: string) {
    const dbUser = await userService.findUser(email);

    if (dbUser) {
      throw new Error("User is already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return newUser;
  }

  async authentificate(email: string, password: string) {
    const user = await userService.get(email);

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw new Error("Wrong password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }
}

export default new MainService();
