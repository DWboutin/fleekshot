import { SignInFormIntl } from "./type";

const fr: SignInFormIntl = {
  signInForm: {
    title: "Connexion",
    input: {
      username: {
        label: "Nom D'utilisateur",
      },
      password: {
        label: "Mot de passe",
      },
    },
    button: {
      submit: "Submit",
    },
    errors: {
      tooShort: "Trop court",
      tooLong: "Trop long",
      isRequired: "Est requis",
      notStrongEnough: "Trop faible",
      mismatch: "Ne correspond pas",
      noUser: "No user was found",
    },
  },
};

export default fr;
