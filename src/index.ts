import express from "express";
import { config } from "./config";
import cookieParser from "cookie-parser";
import mainRoute from "./routes/main-route";
import userRoute from "./routes/user-route";
import projectRoute from "./routes/project-route";
import taskRoute from "./routes/task-route";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger";

const PORT = config.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", mainRoute);
app.use("/users", userRoute);
app.use("/projects", projectRoute);
app.use("/projects/:projectId", taskRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log("Swagger docs are available at http://localhost:5000/api-docs");
});
