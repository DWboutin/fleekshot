export const colors = {
  white: "#ffffff",
  black: "#333333",
  paleGrey: "#fafafa",
  grey: "#dbdbdb",
};

export interface ThemeContainer {
  theme: Theme;
}
export interface Theme {
  html: {
    bg: string;
    text: string;
  };
  header: {
    bg: string;
    border: string;
  };
  content: {
    bg: string;
  };
}

export const theme: Theme = {
  html: {
    bg: colors.white,
    text: colors.black,
  },
  header: {
    bg: colors.white,
    border: colors.grey,
  },
  content: {
    bg: colors.paleGrey,
  },
};
