import React, {useState} from "react";
import {Typography, List, ListItem, ListItemText, IconButton, Badge, Menu, Box} from "@mui/material";
import BalanceIcon from '@mui/icons-material/Balance';

const TradeMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [tradesCount] = useState(3);

    const handleTradeClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const trades = [
        "You received a new trade request.",
        "Your item was viewed 5 times today.",
        "Your trade proposal was accepted."
    ];

    return (
        <Box>
            <IconButton onClick={handleTradeClick} sx={{ mb: -1}}>
                <Badge badgeContent={tradesCount} color="error">
                    <BalanceIcon />
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
                    {trades.map((note, index) => (
                        <ListItem key={index} divider>
                            <ListItemText primary={note} />
                        </ListItem>
                    ))}
                </List>
            </Menu>
        </Box>
    );
};

export default TradeMenu;
