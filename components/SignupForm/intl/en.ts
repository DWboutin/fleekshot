import { SignupFormIntl } from "./type";

const en: SignupFormIntl = {
  signupForm: {
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
