import UserResponseFactory from "../UserResponseFactory";

describe("UserFactory", () => {
  const userResponseFactory = new UserResponseFactory();

  describe("formatResponse", () => {
    const DATA = {
      name: "NAME",
    };

    it("should format a successful response", () => {
      expect(userResponseFactory.formatResponse(DATA)).toEqual({
        statusCode: 200,
        body: DATA,
      });
    });
  });

  describe("formatErrorResponse", () => {
    it("should handle a validation error correctly", () => {
      const ERROR = {
        name: "ValidationError",
        message: "Validation has failed",
      } as Error;

      expect(userResponseFactory.formatErrorResponse(ERROR)).toEqual({
        statusCode: 400,
        body: {
          error: {
            name: ERROR.name,
            message: ERROR.message,
            data: ERROR,
          },
        },
      });
    });

    it("should handle an error correctly", () => {
      const ERROR = {
        name: "Error",
        message: "An error has occured",
      } as Error;

      expect(userResponseFactory.formatErrorResponse(ERROR)).toEqual({
        statusCode: 500,
        body: {
          error: {
            name: ERROR.name,
            message: ERROR.message,
            data: ERROR,
          },
        },
      });
    });

    it("should handle an unknown error correctly", () => {
      const ERROR = {
        name: "Unknown",
        message: "Unknown",
      } as Error;

      expect(userResponseFactory.formatErrorResponse(ERROR)).toEqual({
        statusCode: 500,
        body: {
          error: {
            name: ERROR.name,
            message: ERROR.message,
            data: ERROR,
          },
        },
      });
    });
  });
});
