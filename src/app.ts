import "reflect-metadata";
import "express-async-errors";
import express from "express"
import errorHandler from "./errors/errorHandler";

export const app = express();
app.use(express.json());

//Routes 

// errorHandler DEVE SER SEMPRE O ÚLTIMO DOS app.use()
app.use(errorHandler);