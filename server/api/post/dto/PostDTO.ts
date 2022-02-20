import { Post } from "../models/PostModel";

export interface PostData {
  message: string;
}

export interface PostDocument extends Post, Document {}
