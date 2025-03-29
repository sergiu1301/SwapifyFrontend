import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import {useGetTheme} from "../hooks/useGetTheme.ts";

interface SidebarProps {
    context: "individuals" | "roles";
    handleButtonClick: (context: "individuals" | "roles") => void;
}

const sidebarButtonActive = {
    textTransform: "unset",
    justifyContent: "flex-start",
    marginBottom: "8px",
};

const sidebarButtonInactive = {
    textTransform: "unset",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    marginBottom: "8px",
    boxShadow: "none",
    border: "none",
};
const Sidebar: React.FC<SidebarProps> = ({ context, handleButtonClick }) => {
    const theme=useGetTheme()
    return (
        <Grid
            item
            xs={12}
            md={2}
            sx={{
                // backgroundColor: theme==="dark" ? "#2a2a2a" : "#e6e6e6",
                borderRight: theme==="light" ? "2px solid #e1af33" : "2px solid #1a1a1a",
                display: "flex",
                flexDirection: "column",
                padding: "16px",
            }}
        >
            <Box sx={{ display: "flex", marginLeft: -2, marginBottom: 2 }}>
                <img
                    src="../src/assets/logo.svg"
                    alt="Logo"
                    style={{ height: "60px", marginTop: -13, marginRight: -5 }}
                />
                <Typography variant="h6">Swapify</Typography>
            </Box>
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
                Manage
            </Typography>
            <Button
                onClick={() => handleButtonClick("individuals")}
                sx={context === "individuals" ? sidebarButtonActive : sidebarButtonInactive}
                style={{color:theme==="light" && context !== "individuals" ?  "#2b2b2b" : "#fefdfb"}}
            >
                Individuals
            </Button>

            <Button
                onClick={() => handleButtonClick("roles")}
                sx={context === "roles" ? sidebarButtonActive : sidebarButtonInactive}
                style={{color:theme==="light" && context !== "roles" ?  "#2b2b2b" : "#fefdfb"}}
            >
                Roles
            </Button>
        </Grid>
    );
};

export default Sidebar;
