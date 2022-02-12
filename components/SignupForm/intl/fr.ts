import { SignupFormIntl } from "./type";

const fr: SignupFormIntl = {
  signupForm: {
    input: {
      name: {
        label: "Nom complet",
      },
      username: {
        label: "Nom D'utilisateur",
      },
      password: {
        label: "Mot de passe",
      },
      confirmPassword: {
        label: "Confirmation du mot de passe",
      },
    },
    errors: {
      tooShort: "Trop court",
      tooLong: "Trop long",
      isRequired: "Est requis",
      notStrongEnough: "Trop faible",
      mismatch: "Ne correspond pas",
    },
  },
};

export default fr;
