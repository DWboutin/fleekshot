import flat from "flat";

import signUpForm from "../../SignUpForm/intl/fr";
import signInForm from "../../SignInForm/intl/fr";
import { IntlMessages } from "./types";

const fr = {
  home: "Accueil",
  ...signUpForm,
  ...signInForm,
};

export default flat(fr, { delimiter: "_" }) as IntlMessages;
