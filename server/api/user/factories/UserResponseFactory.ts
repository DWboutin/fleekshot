import {
  ResponseFactory,
  FormattedResponse,
} from "../../../factories/ResponseFactory";

class UserResponseFactory implements ResponseFactory {
  getErrorStatusCode(errorName: string): number {
    switch (errorName) {
      case "ValidationError":
        return 400;
      case "Error":
      default:
        return 500;
    }
  }

  formatResponse(data: any): FormattedResponse {
    return {
      statusCode: 200,
      body: data,
    };
  }

  formatErrorResponse(data: Error): FormattedResponse {
    return {
      statusCode: this.getErrorStatusCode(data.name),
      body: {
        error: {
          name: data.name,
          message: data.message,
          data,
        },
      },
    };
  }
}

export default UserResponseFactory;
