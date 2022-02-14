import { Request, Response, NextFunction } from "express";
import DataValidator from "../../validator/DataValidator";
import { UserSignInData, UserSignUpData } from "../dto/UserDTO";
import { UserFactory } from "../factories/UserFactory";

import UserModel from "../models/UserModel";
import UserValidator from "../validators/UserValidator";

class UserController {
  constructor(
    private validator: UserValidator,
    private userFactory: UserFactory
  ) {}

  public async create(userSignUpData: UserSignUpData) {
    const validRawData = await this.validator.validateSignUpData(
      userSignUpData
    );
    const userData = this.userFactory.createFromSignUp(validRawData);
    const user = new UserModel(userData);

    const result = await user.save();

    return result;
  }

  public async signIn(userSignInData: UserSignInData) {
    const validRawData = await this.validator.validateSignInData(
      userSignInData
    );
    const userData = this.userFactory.formatForSignIn(validRawData);
    const user = await UserModel.findOne({
      username: userData.username,
    });

    if (user) {
      const userPasswordCompare = this.userFactory.formatPasswordToCompare(
        user,
        validRawData.password
      );
      await this.validator.validatePasswordWithModel(userPasswordCompare);

      return this.userFactory.formatFromDocument(user);
    }

    return [];
  }

  public async read() {
    const result = await UserModel.find({});

    return result;
  }
}

export default UserController;
