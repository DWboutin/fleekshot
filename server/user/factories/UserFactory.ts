import { UserSignUpData } from "../dto/UserDTO";
import { User } from "../models/UserModel";
import { EncryptionService } from "../../services/EncryptionService";

export interface UserFactory {
  createFromSignUp(userRawData: UserSignUpData): User;
}

class UserFactoryImpl implements UserFactory {
  constructor(private encryptionServive: EncryptionService) {}

  createFromSignUp(userRawData: UserSignUpData): User {
    return {
      name: userRawData.name,
      username: userRawData.username,
      password: this.encryptionServive.encrypt(userRawData.password),
    };
  }
}

export default UserFactoryImpl;
