import { SignUpFormIntl } from "./type";

const fr: SignUpFormIntl = {
  signUpForm: {
    title: "Inscription",
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
