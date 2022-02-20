import { ErrorCodes } from "../../server/handler/errorHandler";
import { HttpErrorsIntl } from "./type";

const en: HttpErrorsIntl = {
  httpErrors: {
    [ErrorCodes.DuplicateInDatabase]:
      'Duplicate "{field}" field with "{value}" in database',
    [ErrorCodes.ValidationError]: 'Field "{field}" {message}',
    [ErrorCodes.NoUser]: "Sign in error - {message}",
    field: {
      name: "name",
      username: "username",
      password: "password",
      confirmPassword: "confirm password",
    },
  },
};

export default en;
