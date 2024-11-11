import { Request, Response } from "express";
import { config } from "../config";
import mainService from "../services/main-service";

class MainController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await mainService.register(name, email, password);
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async authentificate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await mainService.authentificate(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: config.COOKIE_SECURE === "production",
        sameSite: "strict",
        maxAge: 3600000 * 24,
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new MainController();
