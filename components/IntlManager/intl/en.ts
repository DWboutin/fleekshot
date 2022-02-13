import flat from "flat";

import signUpForm from "../../SignUpForm/intl/en";
import signinForm from "../../SignInForm/intl/en";
import { IntlMessages } from "./types";

const en = {
  hello: "Hello",
  ...signUpForm,
  ...signinForm,
};

export default flat(en, { delimiter: "_" }) as IntlMessages;
