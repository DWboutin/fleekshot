import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import UserController from "./controllers/UserController";
import UserFactoryImpl from "./factories/UserFactory";
import EncryptionServiceImpl from "../../services/EncryptionService";
import { UserFormatted, UserSignUpData } from "./dto/UserDTO";
import UserValidator from "./validators/UserValidator";
import ResponseHandler from "../../handler/ResponseHandler";
import path from "path";
import ImageOptimizationService, {
  ImagePaths,
} from "../../services/ImageOptimizer";

dotenv.config();

const encryptionService = new EncryptionServiceImpl(
  process.env.ENCRYPTION_KEY as string
);

const routes = express.Router();

const acceptedMimetypes = [
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ImagePaths.ProfilePicture);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const sessions = req.session.user as UserFormatted;

    cb(null, `${file.fieldname}_${sessions.id}_${uuidv4()}${ext}`);
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (acceptedMimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, true);
    }
  },
});

const validator = new UserValidator();
const userFactory = new UserFactoryImpl(encryptionService);
const imageOptimizer = new ImageOptimizationService();
const userController = new UserController(
  validator,
  userFactory,
  imageOptimizer
);

routes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userSignUpData: UserSignUpData = req.body.user;

    const createdUser = await userController.create(userSignUpData);

    return ResponseHandler.build(res, 200, createdUser);
  } catch (err) {
    next(err);
  }
});

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.user) {
      return ResponseHandler.build(res, 200, req.session.user);
    }

    return ResponseHandler.build(res, 200, {});
  } catch (err) {
    next(err);
  }
});

routes.post(
  "/sign-in",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userSignInData: UserSignUpData = req.body.user;

      const signedInUser = await userController.signIn(userSignInData);

      req.session.user = signedInUser;

      return ResponseHandler.build(res, 200, signedInUser);
    } catch (err) {
      next(err);
    }
  }
);

routes.post(
  "/avatar",
  upload.single("avatar"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userSession = req.session.user as UserFormatted;
      const file = req.file as Express.Multer.File;

      const user = await userController.setProfilePicture(userSession.id, file);

      req.session.user = user as UserFormatted;

      return ResponseHandler.build(res, 200, user);
    } catch (err) {
      next(err);
    }
  }
);

export default routes;
