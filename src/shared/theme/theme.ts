import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    background: {
      default: "#FDFDFD",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#333333",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#222222",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgba(45, 45, 45, 0.9)",
      paper: "rgba(31, 31, 31, 0.9)",
    },
    text: {
      primary: "#ededed",
    },
  },
});
