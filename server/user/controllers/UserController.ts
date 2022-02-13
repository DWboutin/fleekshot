import { Request, Response, NextFunction } from "express";
import DataValidator from "../../validator/DataValidator";

import UserModel from "../models/UserModel";

class UserController {
  private validator: DataValidator;

  constructor(validator: DataValidator) {
    this.validator = validator;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.user;

      const validaData = await this.validator?.validate(data);

      const user = new UserModel(validaData);

      const result = await user.save();

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  public async read(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserModel.find({});

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

export default UserController;
