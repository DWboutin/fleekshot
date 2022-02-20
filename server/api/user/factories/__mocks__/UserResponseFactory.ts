import { ResponseFactory } from "../../../../factories/ResponseFactory";

class UserResponseFactory implements ResponseFactory {
  public getErrorStatusCode = jest.fn();
  public formatResponse = jest.fn();
  public formatErrorResponse = jest.fn();
}

export default UserResponseFactory;
