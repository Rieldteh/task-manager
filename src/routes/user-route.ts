import express from "express";
import userController from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import {
  adminAccessMiddleware,
  selfAccessMiddleware,
} from "../middlewares/access-middleware";

const userRouter = express.Router();
userRouter.get(
  "/",
  authMiddleware,
  adminAccessMiddleware,
  userController.getAll
);
userRouter.get("/:id", authMiddleware, userController.get);
userRouter.delete(
  "/:id",
  authMiddleware,
  selfAccessMiddleware,
  userController.delete
);

export default userRouter;
