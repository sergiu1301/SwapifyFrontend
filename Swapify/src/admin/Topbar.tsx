import React from "react";
import {
    AppBar,
    Box,
    Theme,
    Toolbar, Typography,
} from "@mui/material";
import UserMenu from "../user/UserMenu";
import NotificationsMenu from "../user/NotificationsMenu";

interface TopbarProps {
    setShouldRefetchTheme:(val:boolean)=>void
    shouldRefetchTheme:boolean
    theme:Theme
}

const Topbar: React.FC<TopbarProps> = ({setShouldRefetchTheme, shouldRefetchTheme, theme}) => {
    
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
                {/* LOGO */}
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: -1 }}>
                    <img
                        src="../src/assets/logo.svg"
                        alt="Logo"
                        style={{ height: "50px", marginRight: -5 }}
                    />
                    <Typography variant="h6" noWrap>
                        Swapify
                    </Typography>
                </Box>

                {/* MENU */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <NotificationsMenu />
                    <UserMenu
                        setShouldRefetchTheme={setShouldRefetchTheme}
                        shouldRefetchTheme={shouldRefetchTheme}
                        theme={theme}
                    />
                </Box>
            </Toolbar>
        </AppBar>

    );
};

export default Topbar;