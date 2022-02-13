import flat from "flat";

import signUpForm from "../../SignUpForm/intl/fr";
import signInForm from "../../SignInForm/intl/fr";
import { IntlMessages } from "./types";

const fr = {
  hello: "Bonjour",
  ...signUpForm,
  // ...signInForm,
};

export default flat(fr, { delimiter: "_" }) as IntlMessages;
