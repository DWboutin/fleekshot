import { NextFunction, Request, Response } from "express";
import { MongoError, MongoServerError } from "mongodb";
import { Error } from "mongoose";
import { ValidationError } from "yup";
// import { YupValidationError } from "../validator/DataValidator";

export enum ErrorNames {
  DuplicateInDatabase = "Duplicate in database",
}

export const handleValidationError = (err: ValidationError, res: Response) => {
  const code = 400;
  const errors: { [key: string]: string[] } = {};
  err.inner.forEach((e) => {
    if (e.path && !(e.path in errors)) {
      errors[e.path] = [];
    }

    errors[e.path as string].push(e.message as string);
  });

  res.status(code).send({ success: false, messages: errors });
};

export const handleFieldValidationError = (
  err: ValidationError,
  res: Response
) => {
  const errors = err.errors.join(", ");
  const code = 400;

  res.status(code).send({ success: false, messages: errors, value: err.value });
};

export const handleDuplicateError = (err: MongoServerError, res: Response) => {
  const name = ErrorNames.DuplicateInDatabase;
  const messages = Object.keys(err.keyValue).map((field) => ({
    field,
    value: err.keyValue[field],
    message: `${field} must be unique, "${err.keyValue[field]}" can't be a duplicate`,
  }));
  const code = 400;

  res
    .status(code)
    .send({ success: false, name, messages: messages, value: err.value });
};

const errorHandler = (
  err: Error | ValidationError | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if ((err as MongoError).code === 11000) {
      return handleDuplicateError(err as MongoError, res);
    }
    if (err.name === "ValidationError") {
      return handleValidationError(err as ValidationError, res);
    }
    if (err.name === "YupValidationError") {
      return handleFieldValidationError(err as ValidationError, res);
    }
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, messages: `An unknown error occured.` });
  }
};

export default errorHandler;
