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
      main: "#94919a",
      50: "#f6f6f7",
      100: "#efeff0",
      200: "#e1e1e4",
      300: "#d4d4d8",
      400: "#b9b9c0",
      500: "#a7a6ae",
      600: "#94919a",
      700: "#7f7d85",
      800: "#68676c",
      900: "#56555a",
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
    MuiPagination: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F3F3",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
          fontSize: "0.9rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          input: {
            fontSize: "1rem",
          },
          "& .MuiOutlinedInput-input": {
            padding: "11px 13.5px",
          },
          "& .Mui-focused": {
            borderColor: "#0071B9",
          },
          "& .MuiInputBase-inputSizeSmall": {
            padding: "8px 13.5px",
            fontSize: "0.8rem",
          },
        },
      },
    },
    MuiPopper: {
      defaultProps: {
        placement: "bottom-end",
        className: "!mt-2",
      },
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            padding: "6px",
            borderRadius: "4px",
            "& > button": {
              width: "100%",
              display: "flex",
              gap: "0.5rem",
              padding: "1rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "0.125rem",
              alignItems: "center",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
              "& > svg": {
                color: "#3f3f46",
                fontSize: "1rem",
              },
              "& > span": {
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#3f3f46",
              },
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "0px !important",
            paddingRight: "39px !important",
          },
          "& .MuiInputBase-root": {
            "& input": {
              padding: "11px 13.5px !important",
            },
            height: "100%",
            fontFamily: '"Work Sans", sans-serif',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Work Sans", sans-serif',
          fontSize: "0.87rem",
          "&.placeholder": {
            color: "#94919a",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          gap: "1rem",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "fit-content",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          padding: 0,
          fontSize: "1rem",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-paper": {
            padding: "16px",
            minWidth: "450px",
            maxWidth: "500px",
            borderRadius: "0px",
            "@media (max-width: 500px)": {
              minWidth: "auto",
            },
            "@media (max-width: 425px)": {
              marginLeft: "16px",
              marginRight: "16px",
              width: "100%",
            },
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "16px 0px 12px !important",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "12px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingTop: "12px",
          gap: "8px",
        },
      },
    },
  },
});

export default theme;
