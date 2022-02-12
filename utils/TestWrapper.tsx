import React, { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import IntlManager from "../components/IntlManager";
import GlobalStyle from "../styles/globalStyle";

import { theme } from "../styles/styles";

interface Props {
  children: ReactNode;
}

const TestWrapper: React.FunctionComponent<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <IntlManager>{children}</IntlManager>
  </ThemeProvider>
);

export default TestWrapper;
