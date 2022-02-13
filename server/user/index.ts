import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import UserController from "./controllers/UserController";
import DataValidator from "../validator/DataValidator";

import userCreationSchema from "../../validations/userCreationSchema";
import UserFactoryImpl from "./factories/UserFactory";
import EncryptionServiceImpl from "../services/EncryptionService";
import { UserSignupData } from "./dto/UserDTO";

dotenv.config();

const encryptionService = new EncryptionServiceImpl(
  process.env.ENCRYPTION_KEY as string
);
const validator = new DataValidator<UserSignupData>(userCreationSchema);
const userFactory = new UserFactoryImpl(encryptionService);
const User = new UserController(validator, userFactory);

const routes = express.Router();

routes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userSignupData: UserSignupData = req.body.user;

    const createdUser = await User.create(userSignupData);

    res.status(200).send(createdUser);
  } catch (err) {
    next(err);
  }
});

routes.get("/read", (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = User.read();

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

export default routes;
