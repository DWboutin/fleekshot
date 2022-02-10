import type { AppProps } from "next/app";
import "normalize.css";
import { ThemeProvider } from "styled-components";

import Layout from "../components/Layout";
import GlobalStyle from "../styles/globalStyle";
import { theme } from "../styles/styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
