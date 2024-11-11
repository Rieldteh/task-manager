import { Request, Response } from "express";
import userService from "../services/user-service";
import mainController from "./main-controller";

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await userService.get(id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { password } = req.body;
      await userService.delete(req.user.userId, password);
      await mainController.logout(req, res);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new UserController();
