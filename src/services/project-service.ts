import { PrismaClient, UserRole } from "@prisma/client";
import userService from "./user-service";

const prisma = new PrismaClient();

class ProjectService {
  async getAll() {
    const projects = await prisma.project.findMany({
      include: { users: true },
    });

    return projects;
  }

  async create(title: string, description: string, creatorId: number) {
    const count = await prisma.project.count({
      where: {
        AND: [
          { title: { contains: title, mode: "insensitive" } },
          { creatorId },
        ],
      },
    });

    let newTitle = title;

    if (count != 0) {
      const newCount = (count + 1).toString();
      newTitle = `${title} (${newCount})`;
    }

    const project = await prisma.project.create({
      data: {
        title: newTitle,
        description,
        creatorId,
        users: {
          connect: { id: creatorId },
        },
      },
      include: { users: true, tasks: true },
    });

    return project;
  }

  async get(id: number) {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { tasks: true, users: true },
    });

    if (!project) {
      throw new Error("Project doesn't exist");
    }

    return project;
  }

  async update(id: number, title: string, description: string) {
    await this.get(id);

    const project = await prisma.project.update({
      where: { id },
      data: { title, description },
      include: {
        tasks: true,
        users: true,
      },
    });
    return project;
  }

  async delete(id: number) {
    await this.get(id);
    await prisma.project.delete({ where: { id } });
  }

  async getUsers(id: number) {
    const projectUsers = await prisma.project.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    if (!projectUsers) {
      throw new Error("Project doesn't exist");
    }

    return projectUsers.users;
  }

  async addUser(id: number, userId: number) {
    const projectUser = await this.getProjectUser(id, userId);

    if (projectUser) {
      throw new Error("User is already added");
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        users: {
          connect: { id: userId },
        },
      },
      include: { users: true },
    });
    return project.users;
  }

  async delUser(id: number, userId: number) {
    const projectUser = await this.getProjectUser(id, userId);

    if (!projectUser) {
      throw new Error("User is not found");
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        users: {
          disconnect: { id: userId },
        },
      },
      include: { users: true },
    });
    return project.users;
  }

  async getProjectUser(id: number, userId: number) {
    await this.get(id);
    await userService.get(userId);

    const dbUsers = await prisma.project.findUnique({
      where: { id },
      include: { users: true },
    });

    return dbUsers?.users.find((user) => user.id === userId);
  }

  async isUserBelongProject(id: number, userId: number, role: UserRole) {
    const projectUser = await this.getProjectUser(id, userId);

    if (!projectUser && role !== UserRole.ADMIN) {
      throw new Error("You are not a member of this project");
    }
  }
}

export default new ProjectService();
