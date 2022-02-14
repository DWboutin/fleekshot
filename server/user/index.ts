import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import UserController from "./controllers/UserController";
import UserFactoryImpl from "./factories/UserFactory";
import EncryptionServiceImpl from "../services/EncryptionService";
import { UserSignUpData } from "./dto/UserDTO";
import UserValidator from "./validators/UserValidator";

dotenv.config();

const encryptionService = new EncryptionServiceImpl(
  process.env.ENCRYPTION_KEY as string
);

const routes = express.Router();

const validator = new UserValidator();
const userFactory = new UserFactoryImpl(encryptionService);
const User = new UserController(validator, userFactory);

routes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userSignUpData: UserSignUpData = req.body.user;

    const createdUser = await User.create(userSignUpData);

    res.status(200).send(createdUser);
  } catch (err) {
    next(err);
  }
});

routes.post(
  "/sign-in",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userSignInData: UserSignUpData = req.body.user;

      const createdUser = await User.signIn(userSignInData);

      res.status(200).send(createdUser);
    } catch (err) {
      next(err);
    }
  }
);

routes.get("/read", (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = User.read();

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

export default routes;
