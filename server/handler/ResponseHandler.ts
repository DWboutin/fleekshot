import { Response } from "express";
import { ErrorCodes } from "./errorHandler";

export interface RequestResponseMessages {
  field?: string;
  value?: string;
  message: string;
}

export interface RequestResponse<T> {
  success: boolean;
  data: T;
  errorCode?: ErrorCodes;
  messages: RequestResponseMessages[];
}

class ResponseHandler {
  static build(res: Response, statusCode: number, data: any, success = true) {
    res.status(statusCode).send({
      success,
      data,
    });
  }
}

export default ResponseHandler;
