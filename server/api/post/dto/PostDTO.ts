import { Document, Types } from "mongoose";
import { UserFormatted } from "../../user/dto/UserDTO";
import { Post } from "../models/PostModel";

export interface PostData {
  image: Express.Multer.File;
  message: string;
}

export interface PostCreationData {
  author: Types.ObjectId | null;
  message: string;
}

export interface PostFormatted {
  id: string;
  message: string;
  createdAt: Date;
  modifiedAt: Date | null;
  image: string;
  author: UserFormatted | null;
}

export interface PostDocument extends Post, Document {}
