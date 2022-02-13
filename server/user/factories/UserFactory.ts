import { UserSignupData } from "../dto/UserDTO";
import { User } from "../models/UserModel";
import { EncryptionService } from "../../services/EncryptionService";

export interface UserFactory {
  createFromSignup(userRawData: UserSignupData): User;
}

class UserFactoryImpl implements UserFactory {
  constructor(private encryptionServive: EncryptionService) {}

  createFromSignup(userRawData: UserSignupData): User {
    return {
      name: userRawData.name,
      username: userRawData.username,
      password: this.encryptionServive.encrypt(userRawData.password),
    };
  }
}

export default UserFactoryImpl;
