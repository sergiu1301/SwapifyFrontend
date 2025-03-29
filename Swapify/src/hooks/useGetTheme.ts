import useMediaQuery from "@mui/material/useMediaQuery";

export const useGetTheme = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredBrowserColor=prefersDarkMode ? "dark" : "light";
    return localStorage.getItem("theme") || preferredBrowserColor;
}