import en from "./en";
import fr from "./fr";

export enum IntlLocale {
  en = "en",
  fr = "fr",
}

export interface IntlMessages extends Record<string, string> {
  hello: string;
}

const messages: Record<IntlLocale, IntlMessages> = {
  en,
  fr,
};

export default messages;
