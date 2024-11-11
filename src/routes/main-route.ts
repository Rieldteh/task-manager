import express from "express";
import mainController from "../controllers/main-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const mainRouter = express.Router();

mainRouter.post("/register", mainController.register);
mainRouter.post("/authentificate", mainController.authentificate);
mainRouter.post("/logout", authMiddleware, mainController.logout);

export default mainRouter;
