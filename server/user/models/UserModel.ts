import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface User {
  name: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
