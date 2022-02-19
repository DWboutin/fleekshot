export const colors = {
  white: "#ffffff",
  black: "#333333",
  paleGrey: "#fafafa",
  grey: "#dbdbdb",
  grey2: "#999999",
  red: "#f6655a",
  green: "#6BB700",
  lightBlue: "#44b5ff",
  blue: "#0095f6",
  blue2: "#0b7ec9",
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
    profile: {
      bg: string;
    };
  };
  content: {
    bg: string;
  };
  typography: {
    h1: {
      color: string;
    };
  };
  forms: {
    errorColor: string;
    successColor: string;
    container: {
      bg: string;
      border: string;
      borderRadius: string;
      fieldMarginBottom: string;
    };
    textField: {
      border: string;
      borderFocus: string;
      bg: string;
      borderRadius: string;
      label: string;
    };
    button: {
      bg: string;
      borderRadius: string;
      color: string;
      hoverBg: string;
      activeBg: string;
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
  utilsLinks: {
    color: string;
    hoverColor: string;
  };
  animations: {
    easeInOutQuint: string;
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
    profile: {
      bg: colors.grey2,
    },
  },
  content: {
    bg: colors.paleGrey,
  },
  typography: {
    h1: {
      color: colors.black,
    },
  },
  forms: {
    errorColor: colors.red,
    successColor: colors.green,
    container: {
      bg: colors.white,
      border: colors.grey,
      borderRadius: "3px",
      fieldMarginBottom: "10px",
    },
    textField: {
      border: colors.grey,
      borderFocus: colors.grey2,
      bg: colors.paleGrey,
      borderRadius: "3px",
      label: colors.grey2,
    },
    button: {
      bg: colors.blue,
      hoverBg: colors.lightBlue,
      activeBg: colors.blue2,
      borderRadius: "3px",
      color: colors.white,
    },
  },
  layout: {
    page: {
      width: "975px",
      padding: "0 20px",
    },
    signup: {
      width: "350px",
      padding: "20px",
    },
  },
  utilsLinks: {
    color: colors.grey2,
    hoverColor: colors.black,
  },
  animations: {
    easeInOutQuint: "cubic-bezier(0.83, 0, 0.17, 1)",
  },
};
