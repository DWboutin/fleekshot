import { Request, Response, NextFunction } from "express";
import DataValidator from "../../validator/DataValidator";
import { UserSignupData } from "../dto/UserDTO";
import { UserFactory } from "../factories/UserFactory";

import UserModel from "../models/UserModel";

class UserController {
  constructor(
    private validator: DataValidator<UserSignupData>,
    private userFactory: UserFactory
  ) {}

  public async create(userSignupData: UserSignupData) {
    const validRawData = await this.validator?.validate(userSignupData);
    const userData = this.userFactory.createFromSignup(validRawData);
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
