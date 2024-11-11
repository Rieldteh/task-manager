import express from "express";
import projectController from "../controllers/project-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import {
  adminAccessMiddleware,
  projectAccessMiddleware,
} from "../middlewares/access-middleware";

const projectRouter = express.Router();

projectRouter.get(
  "/",
  authMiddleware,
  adminAccessMiddleware,
  projectController.getAll
);
projectRouter.post(
  "/",
  authMiddleware,
  adminAccessMiddleware,
  projectController.create
);
projectRouter.get(
  "/:projectId",
  authMiddleware,
  projectAccessMiddleware,
  projectController.get
);
projectRouter.put(
  "/:projectId",
  authMiddleware,
  adminAccessMiddleware,
  projectController.update
);
projectRouter.delete(
  "/:projectId",
  authMiddleware,
  adminAccessMiddleware,
  projectController.delete
);
projectRouter.get(
  "/:projectId/users",
  authMiddleware,
  projectAccessMiddleware,
  projectController.getUsers
);
projectRouter.post(
  "/:projectId/users/:id",
  authMiddleware,
  adminAccessMiddleware,
  projectController.addUser
);
projectRouter.delete(
  "/:projectId/users/:id",
  authMiddleware,
  adminAccessMiddleware,
  projectController.delUser
);

export default projectRouter;
