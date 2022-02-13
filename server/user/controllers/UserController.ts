import { Request, Response, NextFunction } from "express";
import DataValidator from "../../validator/DataValidator";
import { UserSignUpData } from "../dto/UserDTO";
import { UserFactory } from "../factories/UserFactory";

import UserModel from "../models/UserModel";

class UserController {
  constructor(
    private validator: DataValidator<UserSignUpData>,
    private userFactory: UserFactory
  ) {}

  public async create(userSignUpData: UserSignUpData) {
    const validRawData = await this.validator?.validate(userSignUpData);
    const userData = this.userFactory.createFromSignUp(validRawData);
    const user = new UserModel(userData);

    const result = await user.save();

    return result;
  }

  public async read() {
    const result = await UserModel.find({});

    return result;
  }
}

export default UserController;
