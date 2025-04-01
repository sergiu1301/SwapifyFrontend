import {Box, Grid, Theme} from "@mui/material";
import MyItemsSection from "./MyItemsSection";
import MyTradeRequestsSection from "./MyTradeRequestsSection";
import Topbar from "../admin/Topbar.tsx";
import AvailableItemsSection from "./AvailableItemsSection.tsx";
import ProfilePage from "./ProfilePage.tsx";
import Sidebar from "./Sidebar.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, {  useState } from "react";

interface DashboardAdminProps {
    setShouldRefetchTheme:(val:boolean)=>void
    shouldRefetchTheme:boolean
    theme:Theme
}

const DashboardUser:React.FC<DashboardAdminProps> = ({setShouldRefetchTheme,shouldRefetchTheme,theme}) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [context, setContext] = useState<"home" | "my-items">("home");

    const currentType = searchParams.get("type");

    const handleButtonClick = (selectedContext: "home" | "my-items") => {
        navigate(`?type=${selectedContext}`);
        setContext(selectedContext);
    };

    return (
        <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
            <Topbar
                setShouldRefetchTheme={setShouldRefetchTheme}
                shouldRefetchTheme={shouldRefetchTheme}
                theme={theme}/>

            <Grid container sx={{ flex: 1, overflow: {xs: "auto", md: "hidden", "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "8px",
                    },
                    scrollbarWidth: "thin",
                    scrollbarColor:  theme.palette.mode === "dark" ? "#555 #2a2a2a" : ""} }}>

                <Sidebar context={context} handleButtonClick={handleButtonClick} />

                <Grid item xs={12} md={10} sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
                    {currentType === "profile" && (
                        <ProfilePage />
                    )}

                    {currentType === "home" && (
                        <>
                            <AvailableItemsSection theme={theme} />
                        </>
                    )}

                    {currentType === "my-items" && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <MyItemsSection />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MyTradeRequestsSection />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardUser;
