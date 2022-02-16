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
      submit: "Submit",
    },
    errors: {
      tooShort: "Too short",
      tooLong: "Too long",
      isRequired: "Is required",
      notStrongEnough: "Not strong enough",
      mismatch: "Password mismatch",
      noUser: "No user was found",
    },
  },
};

export default en;
