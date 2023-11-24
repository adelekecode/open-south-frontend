import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0e82bb",
      50: "#f1f9fe",
      100: "#e2f2fc",
      200: "#bee6f9",
      300: "#85d1f4",
      400: "#44baec",
      500: "#1ca2db",
      600: "#0e82bb",
      700: "#0d6897",
      800: "#0e5376",
      900: "#124968",
    },
    secondary: {
      main: "#0C9444",
      50: "#effef5",
      100: "#d9ffe7",
      200: "#b5fdd1",
      300: "#7cf9ae",
      400: "#3cec83",
      500: "#13d461",
      600: "#09b04d",
      700: "#0c9444",
      800: "#0f6c36",
      900: "#0e592f",
    },

    info: {
      main: "#d4d4d8",
      "50": "#f6f6f7",
      "100": "#efeff0",
      "200": "#e1e1e4",
      "300": "#d4d4d8",
      "400": "#b9b9c0",
      "500": "#a7a6ae",
      "600": "#94919a",
      "700": "#7f7d85",
      "800": "#68676c",
      "900": "#56555a",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& .MuiFormControlLabel-root .MuiTypography-root": {
            fontSize: "0.4rem !important",
          },
        },
      },
      defaultProps: {
        size: "small",
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: "0.875rem",
          color: "#161616",
          fontFamily: '"Work Sans", "sans-serif"',
        },
      },
    },
  },
});

export default theme;
