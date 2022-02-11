import type { AppProps } from "next/app";
import "normalize.css";
import { ThemeProvider } from "styled-components";

import Layout from "../components/Layout";
import GlobalStyle from "../styles/globalStyle";
import { theme } from "../styles/styles";
import IntlManager from "../components/IntlManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <IntlManager>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlManager>
    </ThemeProvider>
  );
}

export default MyApp;
