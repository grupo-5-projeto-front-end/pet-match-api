import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandler from "./errors/errorHandler";
import {
  petsRoutes,
  sessionsRoutes,
  usersRoutes,
  commentsRoutes,
  likesRoutes,
} from "./routes";

export const app = express();

app.use(express.json());

app.use("", sessionsRoutes);
app.use("", usersRoutes);
app.use("", commentsRoutes);
app.use("", petsRoutes);
app.use("", likesRoutes);

app.use(errorHandler);
