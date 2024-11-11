import express from "express";
import taskController from "../controllers/task-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { taskMiddleware } from "../middlewares/task-middleware";
import {
  adminAccessMiddleware,
  projectAccessMiddleware,
  assigneeAccessMiddleware,
} from "../middlewares/access-middleware";

const taskRouter = express.Router({ mergeParams: true });

taskRouter.get(
  "/tasks",
  authMiddleware,
  projectAccessMiddleware,
  taskController.getAll
);
taskRouter.post(
  "/tasks",
  authMiddleware,
  projectAccessMiddleware,
  taskMiddleware,
  taskController.create
);
taskRouter.delete(
  "/tasks/:taskId",
  authMiddleware,
  projectAccessMiddleware,
  assigneeAccessMiddleware,
  taskController.delete
);
taskRouter.get(
  "/tasks/:taskId",
  authMiddleware,
  projectAccessMiddleware,
  taskController.get
);
taskRouter.put(
  "/tasks/:taskId",
  authMiddleware,
  projectAccessMiddleware,
  assigneeAccessMiddleware,
  taskMiddleware,
  taskController.update
);
taskRouter.get(
  "/tasks/:taskId/assignees",
  authMiddleware,
  projectAccessMiddleware,
  taskController.getUsers
);
taskRouter.post(
  "/tasks/:taskId/assignees/:id",
  authMiddleware,
  projectAccessMiddleware,
  adminAccessMiddleware,
  taskController.addUser
);
taskRouter.delete(
  "/tasks/:taskId/assignees/:id",
  authMiddleware,
  projectAccessMiddleware,
  adminAccessMiddleware,
  taskController.delUser
);

export default taskRouter;
