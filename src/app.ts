import "reflect-metadata";
import "express-async-errors";
import express from "express"
import errorHandler from "./errors/errorHandler";
import { sessionsRoutes } from "./routes";

export const app = express();
app.use(express.json());

//Routes 
app.use("", sessionsRoutes);

// errorHandler DEVE SER SEMPRE O ÚLTIMO DOS app.use()
app.use(errorHandler);