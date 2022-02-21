import { Document } from "mongoose";
import { User } from "../models/UserModel";

export interface UserSignUpData {
  name: string;
  username: string;
  password: string;
}

export interface UserSignUpRawData extends UserSignUpData {
  confirmPassword: string;
}

export interface UserSignInData {
  username: string;
  password: string;
}

export interface UserDocument extends User, Document {}

export interface UserFormatted {
  id: string;
  name: string;
  username: string;
  profilePicture?: string;
}

export interface UserComparePassword {
  rawPassword: string;
  modelPassword: string;
}
