import React from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    Collapse,
    Drawer as MuiDrawer,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import { useStore } from "../store";

const drawerWidth = 240;

interface SidebarProps {
    context: "individuals" | "roles";
    handleButtonClick: (context: "individuals" | "roles") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ context, handleButtonClick }) => {
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);

    const items = [
        { key: "individuals", label: "Individuals", icon: <PeopleIcon /> },
        { key: "roles", label: "Roles", icon: <SecurityIcon /> },
    ];

    return (
        <MuiDrawer
            variant="permanent"
            open={isSidebarOpen}
            sx={{
                width: isSidebarOpen ? drawerWidth : 64,
                flexShrink: 0,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
                "& .MuiDrawer-paper": {
                    width: isSidebarOpen ? drawerWidth : 64,
                    transition: "width 0.5s cubic-bezier(1, 1, 1, 1)",
                    overflowX: "hidden",
                    mt: "64px",
                },
                height: "calc(100% - 64px)",
            }}
        >
            <Divider />
            <List>
                <Collapse in={isSidebarOpen} timeout={500}>
                    <Box sx={{ px: 2.5, py: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                            Manage
                        </Typography>
                    </Box>
                </Collapse>
                {items.map(({ key, label, icon }) => (
                    <ListItem key={key} disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            onClick={() => handleButtonClick(key as "individuals" | "roles")}
                            selected={context === key}
                            sx={{
                                minHeight: 48,
                                justifyContent: isSidebarOpen ? "initial" : "center",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isSidebarOpen ? 2 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <Collapse
                                in={isSidebarOpen}
                                orientation="horizontal"
                                timeout={500}
                                sx={{
                                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                                    opacity: isSidebarOpen ? 1 : 0,
                                    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-20px)',
                                }}
                            >
                                <ListItemText sx={{opacity: isSidebarOpen ? 1 : 0,
                                    transitionDelay: isSidebarOpen ? "0s" : "0.3s",}} primary={label} />
                            </Collapse>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </MuiDrawer>
    );
};

export default Sidebar;
