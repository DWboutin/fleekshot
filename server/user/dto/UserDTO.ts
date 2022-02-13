import { User } from "../models/UserModel";

export interface UserSignupData extends User {
  confirmPassword: string;
}
