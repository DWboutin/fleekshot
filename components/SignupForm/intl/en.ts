import { SignUpFormIntl } from "./type";

const en: SignUpFormIntl = {
  signUpForm: {
    title: "Sign up",
    input: {
      name: {
        label: "Complete name",
      },
      username: {
        label: "Username",
      },
      password: {
        label: "Password",
      },
      confirmPassword: {
        label: "Confirm password",
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
