import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./identity/Login.tsx";
import Register from "./identity/Register.tsx";
import ForgotPassword from "./identity/ForgotPassword.tsx";
import SuccessNotification from "./email/SuccessNotification.tsx";
import NoSuccessNotification from "./email/NoSuccessNotification.tsx";
import EmailNotification from "./email/EmailNotification.tsx";
import ConfirmEmail from "./email/ConfirmEmail.tsx";
import NewPassword from "./identity/NewPassword.tsx";
import DashboardAdmin from "./admin/DashboadAdmin.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import PageNotFound from "./PageNotFound.tsx";
import { WebSocketProvider } from "./WebSocketProvider.tsx";
import { UserProfileProvider } from "./UserProfileProvider.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  );
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProfileProvider>
          <WebSocketProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <QueryClientProvider client={queryClient}>
                    <Login />
                  </QueryClientProvider>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/admin/manage"
                element={
                  <QueryClientProvider client={queryClient}>
                    <DashboardAdmin />
                  </QueryClientProvider>
                }
              />
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
          </WebSocketProvider>
        </UserProfileProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
