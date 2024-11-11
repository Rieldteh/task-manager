import { Request, Response } from "express";
import projectService from "../services/project-service";

class ProjectController {
  async getAll(req: Request, res: Response) {
    try {
      const projects = await projectService.getAll();
      res.json({ projects });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const project = await projectService.create(
        title,
        description,
        req.user.userId
      );
      res.json({ project });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const project = await projectService.get(projectId);
      res.json({ project });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const { title, description } = req.body;
      const project = await projectService.update(
        projectId,
        title,
        description
      );
      res.json({ project });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      await projectService.delete(projectId);
      res.json({ message: "Project has been deleted" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const projectUsers = await projectService.getUsers(projectId);
      res.json({ projectUsers });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const id = Number(req.params.id);
      const projectUsers = await projectService.addUser(projectId, id);
      res.json({ projectUsers });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delUser(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const id = Number(req.params.id);
      const projectUsers = await projectService.delUser(projectId, id);
      res.json({ projectUsers });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new ProjectController();
