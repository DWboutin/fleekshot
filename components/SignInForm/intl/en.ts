import { SignInFormIntl } from "./type";

const en: SignInFormIntl = {
  signInForm: {
    input: {
      username: {
        label: "Username",
      },
      password: {
        label: "Password",
      },
    },
    button: {
      submit: "submit",
    },
    errors: {
      tooShort: "Too short",
      tooLong: "Too long",
      isRequired: "Is required",
      notStrongEnough: "Not strong enough",
      mismatch: "Password mismatch",
    },
  },
};

export default en;
