export const colors = {
  white: "#ffffff",
  black: "#333333",
  paleGrey: "#fafafa",
  grey: "#dbdbdb",
  grey2: "#aba8a8",
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
  forms: {
    container: {
      border: string;
      borderFocus: string;
      bg: string;
      borderRadius: string;
      padding: string;
      label: string;
    };
  };
  layout: {
    page: {
      width: string;
      padding: string;
    };
    signup: {
      width: string;
      padding: string;
    };
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
  forms: {
    container: {
      border: colors.grey,
      borderFocus: colors.grey2,
      bg: colors.paleGrey,
      borderRadius: "3px",
      padding: "9px 8px 7px",
      label: colors.grey2,
    },
  },
  layout: {
    page: {
      width: "975px",
      padding: "0 20px",
    },
    signup: {
      width: "350px",
      padding: "0 20px",
    },
  },
};
