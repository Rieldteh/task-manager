import { Request, Response, NextFunction } from "express";
import projectService from "../services/project-service";
import userService from "../services/user-service";

export const adminAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.checkAdminAccess(req.user.role);
    next();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const assigneeAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskId = Number(req.params.taskId);
    await userService.checkAssigneeAccess(
      taskId,
      req.user.userId,
      req.user.role
    );
    next();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const selfAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await userService.checkSelfAccess(id, req.user.userId);
    next();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const projectAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projectId = Number(req.params.projectId);
    await projectService.isUserBelongProject(
      projectId,
      req.user.userId,
      req.user.role
    );
    next();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
