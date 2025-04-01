import React, {useState} from "react";
import {Typography, List, ListItem, ListItemText, IconButton, Badge, Menu, Box} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationsCount] = useState(3);

    const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const notifications = [
        "You received a new trade request.",
        "Your item was viewed 5 times today.",
        "Your trade proposal was accepted."
    ];

    return (
        <Box>
            <IconButton onClick={handleNotificationClick} sx={{ mb: -1}}>
                <Badge badgeContent={notificationsCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 300,
                        mt: 1
                    }
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: -1,
                    horizontal: "right"
                }}
            >
                <Typography variant="subtitle1" fontWeight={600} sx={{ px: 2, mb: 1 }}>
                    Notifications
                </Typography>
                <List dense>
                    {notifications.map((note, index) => (
                        <ListItem key={index} divider>
                            <ListItemText primary={note} />
                        </ListItem>
                    ))}
                </List>
            </Menu>
        </Box>
    );
};

export default NotificationsMenu;
