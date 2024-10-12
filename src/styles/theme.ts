type TokenType = Record<string, Record<number | string, string>>;

export const tokensDark: TokenType = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // yellow
    50: "#f0f0f0",
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
  error: {
    //red
    100: "#f8d7da",
    200: "#f1b0b6",
    300: "#ea8a91",
    400: "#e3656c",
    500: "#dc4047",
    600: "#b23338",
    700: "#892529",
    800: "#61191a",
    900: "#390c0c",
  },
  warning: {
    //yellow
    100: "#fff3cd",
    200: "#ffe599",
    300: "#ffd966",
    400: "#ffcc33",
    500: "#ffbf00",
    600: "#cc9900",
    700: "#997300",
    800: "#664c00",
    900: "#332600",
  },
  info: {
    //sky
    100: "#d1ecf1",
    200: "#a3d8e3",
    300: "#75c5d6",
    400: "#47b1c8",
    500: "#199dba",
    600: "#137e95",
    700: "#0e5e70",
    800: "#08404a",
    900: "#032024",
  },
  success: {
    //green
    100: "#d4edda",
    200: "#a9dbb5",
    300: "#7dc98f",
    400: "#51b66a",
    500: "#26a344",
    600: "#1f8337",
    700: "#17622a",
    800: "#0f421d",
    900: "#08210f",
  },
};

function reverseTokens(tokensDark: TokenType): TokenType {
  const reversedTokens: TokenType = {};

  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj: Record<number | string, string> = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });

  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

export const themeSettings = (mode: "light" | "dark") => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },

            error: {
              ...tokensDark.error,
              main: tokensDark.error[300],
            },
            warning: {
              ...tokensDark.warning,
              main: tokensDark.warning[300],
            },
            info: {
              ...tokensDark.info,
              main: tokensDark.info[300],
            },
            success: {
              ...tokensDark.success,
              main: tokensDark.success[300],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },

            error: {
              ...tokensLight.error,
              main: tokensLight.error[700],
            },
            warning: {
              ...tokensLight.warning,
              main: tokensLight.warning[700],
            },
            info: {
              ...tokensLight.info,
              main: tokensLight.info[700],
            },
            success: {
              ...tokensLight.success,
              main: tokensLight.success[700],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
