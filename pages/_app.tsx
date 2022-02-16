import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import "normalize.css";
import "boxicons/css/boxicons.css";

import GlobalStyle from "../styles/globalStyle";
import { theme } from "../styles/styles";
import IntlManager from "../components/IntlManager";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import AuthManager from "../components/AuthManager";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <IntlManager>
        <AuthManager>{getLayout(<Component {...pageProps} />)}</AuthManager>
      </IntlManager>
    </ThemeProvider>
  );
}

export default MyApp;
