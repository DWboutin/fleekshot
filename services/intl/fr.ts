import { ErrorCodes } from "../../server/handler/errorHandler";
import { HttpErrorsIntl } from "./type";

const fr: HttpErrorsIntl = {
  httpErrors: {
    [ErrorCodes.DuplicateInDatabase]:
      'Le champ "{field}" avec la valeur "{value}" se trouve déjà dans la base de donnée',
    [ErrorCodes.ValidationError]: 'Le champ "{field}" {message}',
    [ErrorCodes.NoUser]: "Erreur de connexion - {message}",
    field: {
      name: "nom complet",
      username: "nom d'utilisateur",
      password: "password",
      confirmPassword: "confirm password",
    },
  },
};

export default fr;
