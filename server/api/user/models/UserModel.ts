import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface User {
  name: string;
  username: string;
  password: string;
  profilePicture?: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
