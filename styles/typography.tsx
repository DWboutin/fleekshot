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
