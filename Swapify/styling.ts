import { ThemeOptions } from "@mui/material/styles";

const primaryMain = "#daa520";
const hoverLight = "#c4941d";
const hoverDark = "#e4b849";
const buttonHoverLightText = "#f9f0d8";
const buttonLightText = "#fefdfb";
const lightText = "#2b2b2b"

export const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: primaryMain,
        },
        background: {
            default: "#ececec",
            paper: "#ffffff",
        },
        text:{
            primary:lightText,
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#ececec",
                    color:lightText
                },
            },
        },
        MuiButton: {
            defaultProps: {
                variant: "contained",
                color: "primary",
            },
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    textTransform: "unset",
                    padding: "4px 8px",
                },
                containedPrimary: {
                    boxShadow: "none",
                    backgroundColor: primaryMain,
                    color: buttonLightText,
                    '&:hover': {
                        backgroundColor: hoverLight,
                        color: buttonHoverLightText,
                        boxShadow: "none",
                    },
                },
                outlined: {
                    borderColor: hoverLight,
                    color: hoverLight,
                    '&:hover': {
                        backgroundColor: "#0000000a",
                        borderColor: hoverLight,
                        color: hoverLight,
                    },
                },
            },
        },

        MuiGrid:{
            styleOverrides:{
                root: {
                    color: lightText,
                }
            }
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                },
            },
        }
    },
};

export const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: primaryMain,
        },
        background: {
            default: "#262626",
            paper: "#1a1a1a",
        },
        text:{
            primary:"#ffffff",
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    textTransform: "unset",
                    padding: "4px 8px",
                },
                containedPrimary: {
                    backgroundColor: primaryMain,
                    color: "#1a1a1a",
                    '&:hover': {
                        backgroundColor: hoverDark,
                    },
                },
                outlined: {
                    borderColor: hoverDark,
                    color: hoverDark,
                    '&:hover': {
                        backgroundColor: "#00000000",
                        borderColor: hoverDark,
                        color: hoverDark,
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#262626",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    },
                },
            },
        }

    },
};
