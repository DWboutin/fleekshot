import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import UserController from "./controllers/UserController";
import UserFactoryImpl from "./factories/UserFactory";
import EncryptionServiceImpl from "../../services/EncryptionService";
import { UserSignUpData } from "./dto/UserDTO";
import UserValidator from "./validators/UserValidator";
import UserErrorResponseFactory from "./factories/UserResponseFactory";
import ResponseHandler from "../../handler/ResponseHandler";

dotenv.config();

const encryptionService = new EncryptionServiceImpl(
  process.env.ENCRYPTION_KEY as string
);

const routes = express.Router();

const validator = new UserValidator();
const userFactory = new UserFactoryImpl(encryptionService);
const userErrorResponseFactory = new UserErrorResponseFactory();
const User = new UserController(
  validator,
  userFactory,
  userErrorResponseFactory
);

routes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userSignUpData: UserSignUpData = req.body.user;

    const createdUser = await User.create(userSignUpData);

    ResponseHandler.build(res, 200, createdUser);
  } catch (err) {
    console.error("Unhandled error", err);
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

export default routes;
