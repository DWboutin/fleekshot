import flat from "flat";

import signupForm from "../../SignupForm/intl/fr";
import { IntlMessages } from "./types.d";

const fr = {
  hello: "Bonjour",
  ...signupForm,
};

export default flat(fr, { delimiter: "_" }) as IntlMessages;
