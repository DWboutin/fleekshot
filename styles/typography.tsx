import { css, DefaultTheme } from "styled-components";

export const baseFontSize = 16;
export const toREM = (sizePixel: number, withUnit = true): string | number => {
  const result = sizePixel / baseFontSize;

  if (!withUnit) {
    return result;
  }

  return `${result}rem`;
};

const logoFontFamily = `'Fredoka One', cursive`;
const textFontFamily = `'Open Sans', sans-serif`;

export const fonts = {
  logo: logoFontFamily,
  text: textFontFamily,
};

const fontSizes = {
  h1: toREM(32),
  h2: toREM(24),
  h3: toREM(24),
  large: toREM(16),
  normal: toREM(14),
  small: toREM(12),
  xsmall: toREM(11),
  caption: toREM(10),
};
