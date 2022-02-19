import { SignInFormIntl } from "./type";

const fr: SignInFormIntl = {
  signInForm: {
    title: "Connexion",
    input: {
      username: {
        label: "Nom d'utilisateur",
      },
      password: {
        label: "Mot de passe",
      },
    },
    button: {
      submit: "Se connecter",
    },
    message: {
      success: "Vous êtes maintenant connectés et serez redirigé",
    },
    errors: {
      tooShort: "Est trop court",
      tooLong: "Est trop long",
      isRequired: "Est requis",
      notStrongEnough: "Est trop faible",
      mismatch: "Ne correspond pas",
      noUser: "Aucun utilisateur trouvé",
    },
  },
};

export default fr;
