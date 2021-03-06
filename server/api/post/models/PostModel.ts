import mongoose, { ObjectId } from "mongoose";
import { UserDocument } from "../../user/dto/UserDTO";
import UserModel from "../../user/models/UserModel";

const Schema = mongoose.Schema;

export interface Post {
  image: string;
  message: string;
  createdAt: Date;
  modifiedAt: Date | null;
  author: UserDocument;
}

const postSchema = new Schema({
  image: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  modifiedAt: { type: Date, default: null },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

postSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date();
  } else {
    this.modifiedAt = new Date();
  }

  next();
});

const PostModel = mongoose.model<Post>("Post", postSchema);

export default PostModel;
