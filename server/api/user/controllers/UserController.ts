import { UserSignInData, UserSignUpData } from "../dto/UserDTO";
import UserResponseFactory from "../factories/UserResponseFactory";
import { UserFactory } from "../factories/UserFactory";

import UserModel from "../models/UserModel";
import UserValidator from "../validators/UserValidator";

class UserController {
  constructor(
    private validator: UserValidator,
    private userFactory: UserFactory,
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
}

export default UserController;
