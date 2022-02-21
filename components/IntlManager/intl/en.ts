import flat from "flat";

import signUpForm from "../../SignUpForm/intl/en";
import signInForm from "../../SignInForm/intl/en";
import profile from "../../Profile/intl/en";
import httpErrors from "../../../services/intl/en";
import postForm from "../../PostForm/intl/en";
import { IntlMessages } from "./types";

const en = {
  home: "Home",
  ...signUpForm,
  ...signInForm,
  ...profile,
  ...httpErrors,
  ...postForm,
};

export default flat(en, { delimiter: "_" }) as IntlMessages;
