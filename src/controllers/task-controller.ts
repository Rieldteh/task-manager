import { Request, Response } from "express";
import taskService from "../services/task-service";

class TaskController {
  async getAll(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const tasks = await taskService.getAll(projectId);
      res.json({ tasks });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const { title, description, deadline } = req.body;
      const task = await taskService.create(
        projectId,
        req.user.userId,
        title,
        description,
        deadline
      );
      res.json({ task });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const taskId = Number(req.params.taskId);
      await taskService.delete(projectId, taskId);
      res.json({ message: "Task has been deleted" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const taskId = Number(req.params.taskId);
      const taskInfo = await taskService.get(projectId, taskId);
      res.json({ taskInfo });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const taskId = Number(req.params.taskId);
      const { title, description, deadline, status } = req.body;
      const updTask = await taskService.update(
        projectId,
        taskId,
        title,
        description,
        deadline,
        status
      );
      res.json({ updTask });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const taskId = Number(req.params.taskId);
      const taskUsers = await taskService.getUsers(projectId, taskId);
      res.json({ taskUsers });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const taskId = Number(req.params.taskId);
      const id = Number(req.params.id);
      const taskAssignees = await taskService.addUser(projectId, taskId, id);
      res.json({ taskAssignees });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delUser(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const taskId = Number(req.params.taskId);
      const id = Number(req.params.id);
      const taskAssignees = await taskService.delUser(projectId, taskId, id);
      res.json({ taskAssignees });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new TaskController();
