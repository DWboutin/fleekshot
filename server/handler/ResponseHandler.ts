import { Response } from "express";

class ResponseHandler {
  static build(res: Response, statusCode: number, data: any) {
    res.status(statusCode).send(data);
  }
}

export default ResponseHandler;
