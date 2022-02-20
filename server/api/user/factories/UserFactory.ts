import {
  UserComparePassword,
  UserDocument,
  UserFormatted,
  UserSignUpData,
} from "../dto/UserDTO";
import { User } from "../models/UserModel";
import { EncryptionService } from "../../../services/EncryptionService";
import { Document } from "mongoose";

export interface UserFactory {
  createFromSignUp(userRawData: UserSignUpData): User;
  formatFromDocument(userDocument: UserDocument): UserFormatted;
  formatPasswordToCompare(
    userDocument: UserDocument,
    rawPassword: string
  ): UserComparePassword;
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

  formatFromDocument(userDocument: UserDocument) {
    return {
      id: userDocument._id,
      name: userDocument.name,
      username: userDocument.username,
      profilePicture: userDocument.profilePicture,
    };
  }

  formatPasswordToCompare(userDocument: UserDocument, rawPassword: string) {
    return {
      rawPassword,
      modelPassword: this.encryptionServive.decrypt(userDocument.password),
    };
  }
}

export default UserFactoryImpl;
