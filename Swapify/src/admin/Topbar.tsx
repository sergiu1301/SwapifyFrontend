import React from "react";
import {
    AppBar,
    Box,
    IconButton,
    Theme,
    Toolbar, Typography,
} from "@mui/material";
import UserMenu from "../user/UserMenu";
import NotificationsMenu from "../user/NotificationsMenu";
import {useStore} from "../store";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

interface TopbarProps {
    setShouldRefetchTheme:(val:boolean)=>void
    shouldRefetchTheme:boolean
    theme:Theme
}

const Topbar: React.FC<TopbarProps> = ({setShouldRefetchTheme, shouldRefetchTheme, theme}) => {
    const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen);
const isSideBarOpen = useStore((state) => state.isSidebarOpen);
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", paddingRight: 2 }}>
                <Box sx={{display:"flex", gap:"8px"}}>
                    <IconButton sx={{left:"-12px"}} onClick={()=>{setIsSidebarOpen(!isSideBarOpen)}}>{isSideBarOpen? <MenuIcon/> : <MenuOpenIcon/>}</IconButton>
                    {/* LOGO */}
                    <Box sx={{ display: "flex", alignItems: "center", }}>
                        <img
                            src= {theme.palette.mode === "dark" ? "../src/assets/logo-yellow.svg" : "../src/assets/logo-black.svg"}
                            alt="Logo"
                            style={{ height: "50px"}}
                        />
                        <Typography variant="h6" noWrap>
                            Swapify
                        </Typography>
                    </Box>
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