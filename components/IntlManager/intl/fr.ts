import flat from "flat";

import signUpForm from "../../SignUpForm/intl/fr";
import signInForm from "../../SignInForm/intl/fr";
import profile from "../../Profile/intl/fr";
import httpErrors from "../../../services/intl/fr";
import { IntlMessages } from "./types";

const fr = {
  home: "Accueil",
  ...signUpForm,
  ...signInForm,
  ...profile,
  ...httpErrors,
};

export default flat(fr, { delimiter: "_" }) as IntlMessages;
