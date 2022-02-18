import mongoose from "mongoose";

import { UserSignInData, UserSignUpData } from "../dto/UserDTO";
import UserResponseFactory from "../factories/UserResponseFactory";
import { UserFactory } from "../factories/UserFactory";

import UserModel from "../models/UserModel";
import UserValidator from "../validators/UserValidator";
import ImageOptimizationService, {
  ImagePaths,
} from "../../../services/ImageOptimizer";

class UserController {
  constructor(
    private validator: UserValidator,
    private userFactory: UserFactory,
    private imageOptimizer: ImageOptimizationService,
    private responseFactory: UserResponseFactory
  ) {}

  public async create(userSignUpData: UserSignUpData) {
    try {
      const validRawData = await this.validator.validateSignUpData(
        userSignUpData
      );
      const userData = this.userFactory.createFromSignUp(validRawData);
      const user = new UserModel(userData);

      const result = await user.save();
      const formattedUser = this.userFactory.formatFromDocument(result);

      return formattedUser;
    } catch (err) {
      return this.responseFactory.formatErrorResponse(err as Error);
    }
  }

  public async signIn(userSignInData: UserSignInData) {
    try {
      const validRawData = await this.validator.validateSignInData(
        userSignInData
      );

      const user = await UserModel.findOne({
        username: validRawData.username,
      });

      if (user) {
        const userPasswordCompare = this.userFactory.formatPasswordToCompare(
          user,
          validRawData.password
        );
        const isPasswordValid = await this.validator.validatePasswordWithModel(
          userPasswordCompare
        );

        if (isPasswordValid) {
          const formattedUser = this.userFactory.formatFromDocument(user);

          return formattedUser;
        }
      }

      return {};
    } catch (err) {
      return this.responseFactory.formatErrorResponse(err as Error);
    }
  }

  public async setProfilePicture(userId: string, file: Express.Multer.File) {
    try {
      const id = new mongoose.Types.ObjectId(userId);

      const user = await UserModel.findByIdAndUpdate(id, {
        profilePicture: file.filename,
      });

      if (user) {
        await user.save();

        await this.imageOptimizer.minifyAvatarImage(
          file,
          ImagePaths.MinifiedProfilePicture
        );

        const updatedUser = await UserModel.findById(id);

        if (updatedUser) {
          return this.userFactory.formatFromDocument(updatedUser);
        }
      }

      return {};
    } catch (err) {
      console.log(err);
      return this.responseFactory.formatErrorResponse(err as Error);
    }
  }
}

export default UserController;
