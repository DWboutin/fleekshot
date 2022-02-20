import { SignUpFormIntl } from "./type";

const fr: SignUpFormIntl = {
  signUpForm: {
    title: "Inscription",
    input: {
      name: {
        label: "Nom complet",
      },
      username: {
        label: "Nom d'utilisateur",
      },
      password: {
        label: "Mot de passe",
      },
      confirmPassword: {
        label: "Confirmation du mot de passe",
      },
    },
    button: {
      submit: "S'inscrire",
    },
    message: {
      success: "Vous êtes maintenant inscrits",
    },
    errors: {
      tooShort: "Est trop court",
      tooLong: "Est trop long",
      isRequired: "Est requis",
      notStrongEnough: "Est trop faible",
      mismatch: "Ne correspond pas",
    },
  },
};

export default fr;
