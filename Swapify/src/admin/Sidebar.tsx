import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

interface SidebarProps {
    context: "individuals" | "roles";
    handleButtonClick: (context: "individuals" | "roles") => void;
}

const sidebarButtonActive = {
    textTransform: "unset",
    justifyContent: "flex-start",
    color: "#fff",
    backgroundColor: "#3b3b3b",
    marginBottom: "8px",
};

const sidebarButtonInactive = {
    textTransform: "unset",
    justifyContent: "flex-start",
    color: "#ccc",
    backgroundColor: "transparent",
    marginBottom: "8px",
    "&:hover": {
        backgroundColor: "#444",
    },
};

const Sidebar: React.FC<SidebarProps> = ({ context, handleButtonClick }) => {
    return (
        <Grid
            item
            xs={12}
            md={2}
            sx={{
                backgroundColor: "#2a2a2a",
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
            >
                Individuals
            </Button>

            <Button
                onClick={() => handleButtonClick("roles")}
                sx={context === "roles" ? sidebarButtonActive : sidebarButtonInactive}
            >
                Roles
            </Button>
        </Grid>
    );
};

export default Sidebar;
