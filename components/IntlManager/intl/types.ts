import { ProfileIntlFlatten } from "../../Profile/intl/type";
import { SignInFormIntlFlatten } from "../../SignInForm/intl/type";
import { SignUpFormIntlFlatten } from "../../SignUpForm/intl/type";

export enum IntlLocale {
  en = "en",
  fr = "fr",
}

export interface IntlMessages extends Record<string, any> {
  home: string;
  signUpForm: SignUpFormIntlFlatten;
  signInForm: SignInFormIntlFlatten;
  profile: ProfileIntlFlatten;
}
