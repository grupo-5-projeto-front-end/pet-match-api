import "reflect-metadata";
import "express-async-errors";
import express from "express"
import errorHandler from "./errors/errorHandler";
import { sessionsRoutes, usersRoutes, commentsRoutes } from "./routes";

export const app = express();
app.use(express.json());

//Routes 
app.use("", sessionsRoutes);
app.use("", usersRoutes);
app.use("", commentsRoutes);

// errorHandler DEVE SER SEMPRE O ÚLTIMO DOS app.use()
app.use(errorHandler);