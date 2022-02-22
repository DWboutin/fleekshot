import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";

import "normalize.css";
import "boxicons/css/boxicons.css";

import GlobalStyle from "../styles/globalStyle";
import { theme } from "../styles/styles";
import IntlManager from "../components/IntlManager";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import AuthManager from "../components/AuthManager/components/AuthManager";
import { store } from "../store/";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <IntlManager>
            <AuthManager>{getLayout(<Component {...pageProps} />)}</AuthManager>
          </IntlManager>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default MyApp;
