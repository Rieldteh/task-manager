import projectService from "./project-service";
import userService from "./user-service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TaskService {
  async getAll(projectId: number) {
    const allTasks = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        tasks: true,
      },
    });

    if (!allTasks) {
      throw new Error("Task doesn't exist");
    }

    return allTasks.tasks;
  }

  async create(
    projectId: number,
    userId: number,
    title: string,
    description: string,
    deadline: Date
  ) {
    const count = await prisma.task.count({
      where: {
        AND: [
          { title: { contains: title, mode: "insensitive" } },
          { projectId },
        ],
      },
    });

    let newTitle = title;

    if (count != 0) {
      const newCount = (count + 1).toString();
      newTitle = `${title} (${newCount})`;
    }

    const task = await prisma.task.create({
      data: {
        title: newTitle,
        description,
        projectId,
        deadline,
        assignees: {
          connect: { id: userId },
        },
      },
      include: {
        assignees: true,
      },
    });

    return task;
  }

  async delete(projectId: number, taskId: number) {
    await this.get(projectId, taskId);

    await prisma.task.delete({ where: { id: taskId, projectId } });
  }

  async get(projectId: number, taskId: number) {
    await projectService.get(projectId);

    const task = await prisma.task.findUnique({
      where: { id: taskId, projectId },
      include: {
        assignees: true,
      },
    });

    if (!task) {
      throw new Error("Task doesn't exist");
    }

    return task;
  }

  async update(
    projectId: number,
    taskId: number,
    title: string,
    description: string,
    deadline: Date,
    status: boolean
  ) {
    await this.get(projectId, taskId);

    const task = await prisma.task.update({
      where: {
        id: taskId,
        projectId,
      },
      data: { title, description, deadline, status },
    });

    return task;
  }

  async getUsers(projectId: number, taskId: number) {
    const taskUsers = await prisma.task.findUnique({
      where: { id: taskId, projectId },
      include: {
        assignees: true,
      },
    });

    if (!taskUsers) {
      throw new Error("Task doesn't exist");
    }

    return taskUsers.assignees;
  }

  async addUser(projectId: number, taskId: number, userId: number) {
    await this.get(projectId, taskId);

    await userService.get(userId);

    const users = await prisma.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          connect: { id: userId },
        },
      },
      include: { assignees: true },
    });

    return users.assignees;
  }

  async delUser(projectId: number, taskId: number, userId: number) {
    await this.get(projectId, taskId);

    await userService.get(userId);

    const assignees = await prisma.task.findUnique({
      where: { id: taskId, projectId },
      include: {
        assignees: true,
      },
    });

    if (assignees?.assignees.length === 1) {
      throw new Error("The task must have at least 1 assignee");
    }

    const users = await prisma.task.update({
      where: { id: taskId },
      data: {
        assignees: {
          disconnect: { id: userId },
        },
      },
      include: { assignees: true },
    });

    return users.assignees;
  }
}

export default new TaskService();
