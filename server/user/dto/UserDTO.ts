import { Document } from "mongoose";
import { User } from "../models/UserModel";

export interface UserSignUpData extends User {
  confirmPassword: string;
}

export interface UserSignInData {
  username: string;
  password: string;
}

export interface UserDocument extends User, Document {}

export interface UserSignedIn {
  id: string;
  name: string;
  username: string;
}

export interface UserComparePassword {
  rawPassword: string;
  modelPassword: string;
}
