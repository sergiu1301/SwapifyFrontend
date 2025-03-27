import React, { useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useUserProfile } from "../UserProfileProvider";
import { useWebSocket } from "../WebSocketProvider";
import { useNavigate } from "react-router-dom";

interface UserProfile {
    userName?: string;
    email?: string;
    avatarUrl?: string;
}

const UserMenu: React.FC = () => {
    const { userProfile } = useUserProfile();
    const { logout } = useWebSocket();
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();
    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

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
        logout();
        handleCloseMenu();
    };

    const userName = userProfile?.userName ?? "Unknown User";
    const userEmail = userProfile?.email ?? "unknown@example.com";

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
                        backgroundColor: "#1e1e1e", // fundal întunecat
                        color: "#fff",
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
                    <Avatar alt={userProfile?.userName} sx={{ width: 40, height: 40, mr: 2 }} src="/avatar.jpg" />
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {userName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#ccc" }}>
                            {userEmail}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: "#333" }} />

                {/* Profile */}
                <MenuItem
                    onClick={handleProfileClick}
                    sx={{ display: "flex", gap: 1, color: "#fff" }}
                >
                    <PersonIcon fontSize="small" />
                    <Typography variant="body1">Profile</Typography>
                </MenuItem>

                {/* Settings */}
                <MenuItem
                    onClick={handleCloseMenu}
                    sx={{ display: "flex", gap: 1, color: "#fff" }}
                >
                    <SettingsIcon fontSize="small" />
                    <Typography variant="body1">Settings</Typography>
                </MenuItem>

                {/* Theme (Dark) */}
                <MenuItem
                    onClick={() => {
                        console.log("Theme clicked");
                        handleCloseMenu();
                    }}
                    sx={{
                        display: "flex",
                        gap: 1,
                        color: "#fff",
                    }}
                >
                    {darkMode ? <DarkModeIcon onClick={toggleTheme} fontSize="small"/> : <LightModeIcon onClick={toggleTheme} fontSize="small"/>}
                    <Typography variant="body1">Theme</Typography>

                    <Box sx={{ ml: "auto", display: "flex", alignItems: "flex-end", gap: 0.5 }}>
                        <Typography variant="body2" sx={{ color: "#aaa" }}>
                            Dark
                        </Typography>
                        <ChevronRightIcon fontSize="small" sx={{ color: "#aaa" }} />
                    </Box>
                </MenuItem>

                <Divider sx={{ borderColor: "#333" }} />

                {/* Logout */}
                <MenuItem
                    onClick={handleLogout}
                    sx={{ display: "flex", gap: 1, color: "#fff" }}
                >
                    <LogoutIcon fontSize="small" />
                    <Typography variant="body1">Log out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
