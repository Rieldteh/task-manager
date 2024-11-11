import { join } from "path";
import YAML from "yamljs";

const authPath = YAML.load(join(__dirname, "docs/swagger/paths/auth.yml"));
const projectsPath = YAML.load(
  join(__dirname, "docs/swagger/paths/projects.yml")
);
const tasksPath = YAML.load(join(__dirname, "docs/swagger/paths/tasks.yml"));
const usersPath = YAML.load(join(__dirname, "docs/swagger/paths/users.yml"));
const schemas = YAML.load(
  join(__dirname, "docs/swagger/components/schemas.yml")
);
const responses = YAML.load(
  join(__dirname, "docs/swagger/components/responses.yml")
);

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "API для управления задачами в проектах",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],

  paths: {
    ...authPath,
    ...projectsPath,
    ...tasksPath,
    ...usersPath,
  },
  components: {
    schemas: schemas,
    responses: responses,
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
    },
  },
};

export default swaggerDocument;
