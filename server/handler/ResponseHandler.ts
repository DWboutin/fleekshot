import { Response } from "express";

class ResponseHandler {
  static build(res: Response, statusCode: number, data: any) {
    res.status(statusCode).send({
      success: true,
      ...data,
    });
  }
}

export default ResponseHandler;
