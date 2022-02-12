export enum IntlLocale {
  en = "en",
  fr = "fr",
}

export interface IntlMessages
  extends Record<string, string | SignupFormIntlFlatten> {
  hello: string;
  signupForm: SignupFormIntlFlatten;
}
