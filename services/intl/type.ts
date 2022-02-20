import { ErrorCodes } from "../../server/handler/errorHandler";

export interface HttpErrorsIntl {
  httpErrors: {
    [ErrorCodes.DuplicateInDatabase]: string;
    [ErrorCodes.ValidationError]: string;
    [ErrorCodes.NoUser]: string;
    field: {
      name: string;
      username: string;
      password: string;
      confirmPassword: string;
    };
  };
}

export enum HttpErrorsIntlId {
  httpErrors_1000 = "httpErrors_1000",
  httpErrors_1001 = "httpErrors_1001",
  httpErrors_1002 = "httpErrors_1002",
  httpErrors_field_name = "httpErrors_field_name",
  httpErrors_field_username = "httpErrors_field_username",
  httpErrors_field_password = "httpErrors_field_password",
  httpErrors_field_confirmPassword = "httpErrors_field_confirmPassword",
}

export interface HttpErrorsIntlFlatten
  extends Record<HttpErrorsIntlId, string> {}
