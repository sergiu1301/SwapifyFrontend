import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import {useGetTheme} from "../hooks/useGetTheme.ts";

interface SidebarProps {
    context: "home" | "my-items";
    handleButtonClick: (context: "home" | "my-items") => void;
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
                backgroundColor: theme==="dark" ? "#1f1f1f" : "",
                borderRight: theme==="light" ? "2px solid #e1af33" : "2px solid #2a2a2a",
                //boxShadow: 'inset -1px 0 0 #444',
                display: "flex",
                flexDirection: "column",
                padding: "16px",
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 1, marginTop: 1 }}>
                Context
            </Typography>
            <Button
                onClick={() => handleButtonClick("home")}
                sx={context === "home" ? sidebarButtonActive : sidebarButtonInactive}
                style={{color:theme==="light" && context !== "home" ?  "#2b2b2b" : "#fefdfb"}}
            >
                Home
            </Button>
            <Button
                onClick={() => handleButtonClick("my-items")}
                sx={context === "my-items" ? sidebarButtonActive : sidebarButtonInactive}
                style={{color:theme==="light" && context !== "my-items" ?  "#2b2b2b" : "#fefdfb"}}
            >
                My Items
            </Button>
        </Grid>
    );
};

export default Sidebar;
