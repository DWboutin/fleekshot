import flat from "flat";

import signupForm from "../../SignupForm/intl/en";
import { IntlMessages } from "./types.d";

const en = {
  hello: "Hello",
  ...signupForm,
};

export default flat(en, { delimiter: "_" }) as IntlMessages;
