import { SignInFormIntlId } from "../../../../components/SignInForm/intl/type";

export default class NoUserException extends Error {
  constructor(message?: string) {
    if (typeof message === "undefined") {
      message = SignInFormIntlId.signInForm_errors_noUser;
    }

    super(message);

    this.message = message;
    this.name = "NoUser";

    Error.captureStackTrace(this, NoUserException);
  }
}
