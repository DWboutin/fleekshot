import { useEffect, useState } from "react";
import storageService from "../../../services/storageService";

import { IntlLocale } from "../intl/messages";

export interface IntlManagerSelectors {
  locale: IntlLocale;
}

export interface IntlManagerActions {
  handleLanguageChange: (locale: IntlLocale) => void;
}

export interface IntlManagerHook {
  selectors: IntlManagerSelectors;
  actions: IntlManagerActions;
}

export const defaultLocale = IntlLocale.en;

function useIntlManager(): IntlManagerHook {
  const [locale, setLocale] = useState<IntlLocale>(defaultLocale);

  const handleLanguageChange = (locale: IntlLocale) => {
    setLocale(locale);
    storageService.set("locale", locale);
  };

  useEffect(() => {
    const storedLocale: IntlLocale | null =
      storageService.get<IntlLocale>("locale");

    if (storedLocale && storedLocale !== locale) {
      setLocale(storedLocale);
    }
  }, []);

  return {
    selectors: {
      locale,
    },
    actions: {
      handleLanguageChange,
    },
  };
}

export default useIntlManager;
