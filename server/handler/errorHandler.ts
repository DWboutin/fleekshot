import { NextFunction, Request, Response } from "express";
import { MongoError, MongoServerError } from "mongodb";
import { Error } from "mongoose";
import { ValidationError } from "yup";
import NoUserException from "../api/user/exceptions/NoUserException";
// import { YupValidationError } from "../validator/DataValidator";

export enum ErrorCodes {
  DuplicateInDatabase = 1000,
  ValidationError,
  NoUser,
}

export interface ErrorMessage {
  field?: string;
  value?: string;
  message: string | null;
}

export const handleValidationError = (err: ValidationError, res: Response) => {
  const code = 400;
  const errorCode = ErrorCodes.ValidationError;
  const errors: ErrorMessage[] = err.inner.map((e) => ({
    field: e.path as string,
    message: e.message,
    value: e.value,
  }));

  res.status(code).send({ success: false, errorCode, messages: errors });
};

export const handleDuplicateError = (err: MongoServerError, res: Response) => {
  const errorCode = ErrorCodes.DuplicateInDatabase;
  const messages = Object.keys(err.keyValue).map((field) => ({
    field,
    value: err.keyValue[field],
    message: null,
  }));
  const code = 400;

  res
    .status(code)
    .send({ success: false, errorCode, messages: messages, value: err.value });
};

export const handleNoUserError = (err: NoUserException, res: Response) => {
  const code = 200;
  const errorCode = ErrorCodes.NoUser;
  const errors: ErrorMessage[] = [
    {
      message: err.message,
    },
  ];

  res.status(code).send({ success: false, errorCode, messages: errors });
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
    if (err.name === "NoUser") {
      return handleNoUserError(err as NoUserException, res);
    }
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, messages: `An unknown error occured.`, err });
  }
};

export default errorHandler;
