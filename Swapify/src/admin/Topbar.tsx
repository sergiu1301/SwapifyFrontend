import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import UserMenu from "../user/UserMenu";

const Topbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#000", alignItems: "end" }}>
            <Toolbar>
                <UserMenu />
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;