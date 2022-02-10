import { createGlobalStyle } from "styled-components";
import { ThemeContainer } from "./styles";
import { baseFontSize, fonts } from "./typography";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${baseFontSize}px;
    font-family: ${fonts.text};
    background-color: ${({ theme }: ThemeContainer) => theme.html.bg};
    color: ${({ theme }: ThemeContainer) => theme.html.text};
  }
`;

export default GlobalStyle;
