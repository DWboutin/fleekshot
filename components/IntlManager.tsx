import type { NextPage } from "next";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { createContext, useContext, useMemo } from "react";
import useIntlManager from "./IntlManager/hooks/useIntlManager";
import messages from "./IntlManager/intl/messages";
import { IntlLocale } from "./IntlManager/intl/types";

export interface IntlContextProps {
  locale: IntlLocale;
  handleLanguageChange: (locale: IntlLocale) => void;
}

export const IntlContext = createContext<Partial<IntlContextProps>>({});

export const useIntlContext = (): Partial<IntlContextProps> => {
  const context = useContext(IntlContext);

  if (context === undefined) {
    throw new Error("useLayoutContext must be used within a Layout component");
  }

  return context;
};

const cache = createIntlCache();

const IntlManager: NextPage = ({ children }) => {
  const {
    selectors: { locale },
    actions: { handleLanguageChange },
  } = useIntlManager();
  const intl = useMemo(
    () =>
      createIntl(
        {
          locale,
          messages: messages[locale],
        },
        cache
      ),
    [locale]
  );

  return (
    <IntlContext.Provider
      value={{
        locale,
        handleLanguageChange,
      }}
    >
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </IntlContext.Provider>
  );
};

export default IntlManager;
