import { SignInFormIntl } from "./type";

const fr: SignInFormIntl = {
  signInForm: {
    input: {
      username: {
        label: "Nom D'utilisateur",
      },
      password: {
        label: "Mot de passe",
      },
    },
    button: {
      submit: "submit",
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
