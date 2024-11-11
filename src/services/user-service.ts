import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  async getAll() {
    const users = await prisma.user.findMany();

    if (!users) {
      throw new Error("Users doesn't exist");
    }

    return users;
  }

  async get(identifier: number | string) {
    const user = await this.findUser(identifier);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    return user;
  }

  async delete(id: number, password: string) {
    const user = await this.get(id);

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw new Error("Wrong password");
    }

    await prisma.user.delete({ where: { id } });
  }

  async findUser(param: number | string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: typeof param === "number" ? param : undefined },
          { email: typeof param === "string" ? param : undefined },
        ],
      },
    });

    return user;
  }

  async checkAdminAccess(role: UserRole) {
    if (role !== UserRole.ADMIN) {
      throw new Error("Access denied");
    }
  }

  async checkAssigneeAccess(id: number, userId: number, role: UserRole) {
    try {
      await this.checkAdminAccess(role);
      return;
    } catch {
      /* empty */
    }

    const dbAssignees = await prisma.task.findUnique({
      where: { id },
      include: { assignees: true },
    });

    const assigne = dbAssignees?.assignees.find(
      (assignee) => assignee.id === userId
    );

    if (!assigne) {
      throw new Error("Access denied");
    }
  }

  async checkSelfAccess(id: number, userId: number) {
    if (id !== userId) {
      throw new Error("Access denied");
    }
  }
}

export default new UserService();
