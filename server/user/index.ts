import express, { NextFunction, Request, Response } from "express";

import UserController from "./controllers/UserController";
import DataValidator from "../validator/DataValidator";

import userCreationSchema from "../../validations/userCreationSchema";

const validator = new DataValidator(userCreationSchema);
const User = new UserController(validator);

const routes = express.Router();

routes.post("/create", (req: Request, res: Response, next: NextFunction) => {
  User.create(req, res, next);
});

routes.get("/read", (req: Request, res: Response, next: NextFunction) => {
  User.read(req, res, next);
});

export default routes;
