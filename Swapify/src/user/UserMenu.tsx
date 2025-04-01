import React, { useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem, Theme,
    Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserProfile } from "../UserProfileProvider";
import { useNavigate } from "react-router-dom";
import MaterialUISwitch from "./ThemeSwitcher";
import {logout} from "../lib/utils.ts";

interface UserMenuProps {
    setShouldRefetchTheme:(val:boolean)=>void
    shouldRefetchTheme:boolean
    theme:Theme
}

const UserMenu: React.FC<UserMenuProps> = ({setShouldRefetchTheme,shouldRefetchTheme,theme}) => {
    const { userProfile } = useUserProfile();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("?type=profile");
        handleCloseMenu();
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(navigate);
        handleCloseMenu();
    };

    const userName = userProfile?.userName ?? "Unknown User";
    const userEmail = userProfile?.email ?? "unknown@example.com";
    const toggleTheme=()=>{
        const currTheme=localStorage.getItem("theme") ?? "dark"
        if (!["dark", "light"].includes(currTheme)) return
        currTheme==="dark"?
            localStorage.setItem("theme","light"):localStorage.setItem("theme","dark")
        setShouldRefetchTheme(!shouldRefetchTheme)
    }
    return (
        <Box>
            {/* Buton pe care se face click pentru a deschide meniul */}
            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar alt={userProfile?.userName} src="/avatar.jpg" />
            </IconButton>

            {/* Meniul dropdown */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    sx: {
                        width: 350,
                        mt: 1
                    },
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: -5,
                    horizontal: "right",
                }}
            >
                {/* Header cu Avatar + Nume + Email */}
                <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
                    <Avatar alt={userProfile?.userName} sx={{ width: 40, height: 40, mr: 1.5, mt: 0.5}} src="/avatar.jpg" />
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {userName}
                        </Typography>
                        <Typography variant="body2">
                            {userEmail}
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                {/* Profile */}
                <MenuItem
                    onClick={handleProfileClick}
                    sx={{ display: "flex", gap: 1}}
                >
                    <PersonIcon fontSize="small" />
                    <Typography variant="body1">Profile</Typography>
                </MenuItem>

                {/* Settings */}
                <MenuItem
                    onClick={handleCloseMenu}
                    disabled={true}
                    sx={{ display: "flex", gap: 1 }}
                >
                    <SettingsIcon fontSize="small" />
                    <Typography variant="body1">Settings</Typography>
                </MenuItem>

                {/* Theme (Dark) */}
                <MenuItem
                    // onClick={() => {
                    //     console.log("Theme clicked");
                    //     handleCloseMenu();
                    // }}
                    sx={{
                        display: "flex",
                    }}
                >
                    <MaterialUISwitch checked={theme.palette.mode === "dark"} onChange={toggleTheme} theme={theme}/>
                </MenuItem>

                <Divider />

                {/* Logout */}
                <MenuItem
                    onClick={handleLogout}
                    sx={{ display: "flex", gap: 1 }}
                >
                    <LogoutIcon fontSize="small" />
                    <Typography variant="body1">Log out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
