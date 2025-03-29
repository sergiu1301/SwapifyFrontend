import React from "react";
import {AppBar, Theme, Toolbar} from "@mui/material";
import UserMenu from "../user/UserMenu";

interface TopbarProps {
    setShouldRefetchTheme:(val:boolean)=>void
    shouldRefetchTheme:boolean
    theme:Theme
}

const Topbar: React.FC<TopbarProps> = ({setShouldRefetchTheme,shouldRefetchTheme,theme}) => {
    return (
        <AppBar position="static" sx={{alignItems: "end" }}>
            <Toolbar>
                <UserMenu setShouldRefetchTheme={setShouldRefetchTheme} shouldRefetchTheme={shouldRefetchTheme} theme={theme}/>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;