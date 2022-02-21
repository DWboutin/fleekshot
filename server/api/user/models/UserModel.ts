import mongoose from "mongoose";
import { PostDocument } from "../../post/dto/PostDTO";

const Schema = mongoose.Schema;

export interface User {
  name: string;
  username: string;
  password: string;
  profilePicture?: string;
  posts: PostDocument[];
}

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
