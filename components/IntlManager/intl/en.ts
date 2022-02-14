import flat from "flat";

import signUpForm from "../../SignUpForm/intl/en";
import signInForm from "../../SignInForm/intl/en";
import { IntlMessages } from "./types";

const en = {
  hello: "Hello",
  ...signUpForm,
  ...signInForm,
};

export default flat(en, { delimiter: "_" }) as IntlMessages;
