import React, {useMemo, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./identity/Login.tsx";
import Register from "./identity/Register.tsx";
import ForgotPassword from "./identity/ForgotPassword.tsx";
import SuccessNotification from "./email/SuccessNotification.tsx";
import NoSuccessNotification from "./email/NoSuccessNotification.tsx";
import EmailNotification from "./email/EmailNotification.tsx";
import ConfirmEmail from "./email/ConfirmEmail.tsx";
import NewPassword from "./identity/NewPassword.tsx";
import LandingPage from "./identity/LandingPage.tsx";
import Dashboard from "./admin/Dashboard.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import PageNotFound from "./PageNotFound.tsx";
import { UserProfileProvider } from "./UserProfileProvider.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {lightThemeOptions, darkThemeOptions} from "../styling.ts";
import ItemDetails from "./user/ItemDetails.tsx";
import AvailableItemsSection from "./user/AvailableItemsSection.tsx";
import MyItemsSection from "./user/MyItemsSection.tsx";
import IndividualsSection from "./admin/IndividualsSection.tsx";
import RolesSection from "./admin/RolesSection.tsx";
import ProfilePage from "./user/ProfilePage.tsx";
const queryClient = new QueryClient();

const App: React.FC = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [shouldRefetchTheme,setShouldRefetchTheme]=useState<boolean>(true)
    const theme = useMemo(() => {
            const localStorageTheme = localStorage.getItem("theme");
            if(localStorageTheme==="light")return createTheme(lightThemeOptions);
            if(localStorageTheme==="dark")return createTheme(darkThemeOptions);
            return createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions);
        },[prefersDarkMode,shouldRefetchTheme]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                <UserProfileProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/login"
                            element={
                                    <Login />
                            }
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route
                            element={
                                    <Dashboard setShouldRefetchTheme={setShouldRefetchTheme} shouldRefetchTheme={shouldRefetchTheme} theme={theme}/>
                            }
                        >
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/roles" element={<RolesSection />} />
                            <Route path="/individuals" element={<IndividualsSection />} />
                            <Route path="/home" element={<AvailableItemsSection theme={theme}/>} />
                            <Route path="/my-inventory" element={<MyItemsSection />} />
                            <Route path="/items/:id" element={<ItemDetails />} />
                        </Route>
                        <Route
                            path="/success-notification"
                            element={<SuccessNotification />}
                        />
                        <Route
                            path="/no-success-notification"
                            element={<NoSuccessNotification />}
                        />
                        <Route
                            path="/email-notification"
                            element={<EmailNotification />}
                        />
                        <Route path="/reset-password" element={<NewPassword />} />
                        <Route path="/confirm-email" element={<ConfirmEmail />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </UserProfileProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;
