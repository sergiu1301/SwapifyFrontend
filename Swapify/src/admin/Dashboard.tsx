import React from "react";
import {Box, Grid, Theme} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useStore } from "../store";
import useStatusHub from "../hooks/useStatusHub";

interface DashboardAdminProps {
    setShouldRefetchTheme:(val:boolean)=>void
    shouldRefetchTheme:boolean
    theme:Theme
}

const Dashboard:React.FC<DashboardAdminProps> = ({setShouldRefetchTheme,shouldRefetchTheme,theme}) => {
    const navigate = useNavigate();
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const sidebarTransition = "margin-left 0.5s cubic-bezier(1, 1, 1, 1)";
    const sidebarWidthOpen = 240;
    const sidebarWidthClosed = 64;

    useStatusHub();

    const handleButtonClick = (selectedContext: "individuals" | "roles" | "home" | "my-inventory") => {
        if(selectedContext === "home" || selectedContext === "my-inventory" || selectedContext === "individuals" || selectedContext === "roles") {
            navigate(`/${selectedContext}`);
        }
    };


    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            color: "#fff",
            display: "flex",
            flexDirection: "column"
        }}>
            <Topbar
                setShouldRefetchTheme={setShouldRefetchTheme}
                shouldRefetchTheme={shouldRefetchTheme}
                theme={theme}
            />
            <Grid container sx={{
                flex: 1,
                overflow: {
                    xs: "auto",
                    md: "hidden",
                    "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "8px",
                    },
                    scrollbarWidth: "thin",
                    scrollbarColor:  theme.palette.mode === "dark" ? "#555 #2a2a2a" : ""
                }
            }}>

                <Grid item>
                    <Sidebar handleButtonClick={handleButtonClick} />
                </Grid>

                <Grid item sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    ml: `${isSidebarOpen ? sidebarWidthOpen : sidebarWidthClosed}px`,
                    transition: sidebarTransition,
                }}>
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;