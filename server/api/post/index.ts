import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";

import ResponseHandler from "../../handler/ResponseHandler";
import EncryptionServiceImpl from "../../services/EncryptionService";
import UserFactoryImpl from "../user/factories/UserFactory";
import PostController from "./controllers/PostControllers";
import { PostData } from "./dto/PostDTO";
import PostFactoryImpl from "./factories/PostFactory";
import PostValidator from "./validators/PostValidator";
import ImagePaths from "../../services/ImagePaths";

dotenv.config();

const routes = express.Router();

const acceptedMimetypes = [
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public", ImagePaths.PostPicture));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, `${file.fieldname}_${uuidv4()}${ext}`);
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (acceptedMimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const encryptionService = new EncryptionServiceImpl(
  process.env.ENCRYPTION_KEY as string
);
const userFactory = new UserFactoryImpl(encryptionService);
const validator = new PostValidator();
const postFactory = new PostFactoryImpl(userFactory);
const postController = new PostController(validator, postFactory);

routes.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message }: PostData = req.body;
      const image = req.file as Express.Multer.File;
      const sessionUserId: ObjectId = req.session.user?.id;

      const createdPost = await postController.create(
        {
          message,
          image,
        },
        sessionUserId
      );

      return ResponseHandler.build(res, 200, createdPost);
    } catch (err) {
      next(err);
    }
  }
);

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursor = parseInt(req.query.cursor as string) || 0;
    const posts = await postController.findAll(cursor);

    return ResponseHandler.build(res, 200, posts);
  } catch (err) {
    next(err);
  }
});

export default routes;
