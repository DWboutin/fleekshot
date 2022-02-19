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
      submit: "Sign up",
    },
    message: {
      success: "You're now signed up",
    },
    errors: {
      tooShort: "Is too short",
      tooLong: "Is too long",
      isRequired: "Is required",
      notStrongEnough: "Is not strong enough",
      mismatch: "Password mismatch",
    },
  },
};

export default en;
