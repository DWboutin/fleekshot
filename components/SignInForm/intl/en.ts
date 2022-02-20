import { SignInFormIntl } from "./type";

const en: SignInFormIntl = {
  signInForm: {
    title: "Sign in",
    input: {
      username: {
        label: "Username",
      },
      password: {
        label: "Password",
      },
    },
    button: {
      submit: "Sign in",
    },
    message: {
      success: "You're now signed in and will be redirected",
    },
    errors: {
      tooShort: "Is too short",
      tooLong: "Is too long",
      isRequired: "Is required",
      notStrongEnough: "Is not strong enough",
      mismatch: "Password mismatch",
      noUser: "No user was found",
    },
  },
};

export default en;
