import "express-async-errors";
import "reflect-metadata";
import express from "express"

export const app = express();
app.use(express.json());

//Routes 
// app.use("", );