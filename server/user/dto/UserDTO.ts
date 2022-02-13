import { User } from "../models/UserModel";

export interface UserSignUpData extends User {
  confirmPassword: string;
}
