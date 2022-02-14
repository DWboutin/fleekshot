import { SignInFormIntlFlatten } from "../../intl/type";
import { SignUpFormIntlFlatten } from "../../SignIn/SignUpForm/intl/type";

export enum IntlLocale {
  en = "en",
  fr = "fr",
}

export interface IntlMessages extends Record<string, any> {
  hello: string;
  signUpForm: SignUpFormIntlFlatten;
  signInForm: SignInFormIntlFlatten;
}
