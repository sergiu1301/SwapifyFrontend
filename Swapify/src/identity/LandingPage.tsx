import React from "react";
import {
    Box,
    Typography,
    Button,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SwapHoriz, Inventory2, Lock, Search } from "@mui/icons-material";
import FeatureCarousel from "./FeatureCarousel.tsx";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                position: "relative",
                zIndex: 0,
                overflow: "hidden",
                height:"100vh",
                width:'100vw',
            }}
        >
            {/* 🎨 Background BLOBs - decorative, fixed */}
            <Box
                sx={{
                    position: "fixed",
                    top: "-100px",
                    left: "-150px",
                    width: "400px",
                    height: "400px",
                    backgroundColor: "#e3b43e",
                    opacity: 0.1,
                    filter: "blur(130px)",
                    borderRadius: "50%",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "fixed",
                    bottom: "-100px",
                    right: "-150px",
                    width: "500px",
                    height: "500px",
                    backgroundColor: theme.palette.mode === "dark" ? "#ffffff22" : "#00000011",
                    opacity: 0.1,
                    filter: "blur(160px)",
                    borderRadius: "50%",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            {/* HERO SECTION */}
            <Box
                sx={{
                    maxWidth: "1000px",
                    padding: "12px",
                    maxHeight: "96vh",
                    mx: "auto",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="../src/assets/undraw_deliveries_yellow_adjusted.svg"
                    alt="Landing visual"
                    sx={{
                        width: "70%",
                        objectFit: "contain",
                        mx: "auto",
                        mb: 3,
                    }}
                />
                <Typography
                    variant="h3"
                    fontWeight={800}
                    gutterBottom
                >
                    Welcome to Swapify
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    mb={3}
                >
                    Trade your unused items securely and easily with people near you.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        fontWeight: 600,
                    }}
                    onClick={() => navigate("/login")}
                >
                    Get Started
                </Button>

                <Typography
                    variant="h5"
                    fontWeight={700}
                    textAlign="center"
                    my={3}
                >
                    What can you do with Swapify?
                </Typography>
                <Box sx={{ maxWidth: "1000px", padding: "0 16px", mx: "auto", pb:"12px"}}>
                    <FeatureCarousel features={features} />
                </Box>
            </Box>
        </Box>
    );
};

export default LandingPage;

const features = [
    {
        icon: <SwapHoriz sx={{ fontSize: 40, color: "#e3b43e" }} />,
        title: "Trade Items",
        description: "Easily exchange items with others in your community.",
    },
    {
        icon: <Inventory2 sx={{ fontSize: 40, color: "#e3b43e" }} />,
        title: "Manage Inventory",
        description: "List and manage all your available items from one place.",
    },
    {
        icon: <Search sx={{ fontSize: 40, color: "#e3b43e" }} />,
        title: "Discover Offers",
        description: "Browse what others are offering and find what you need.",
    },
    {
        icon: <Lock sx={{ fontSize: 40, color: "#e3b43e" }} />,
        title: "Secure & Private",
        description: "All trades are protected. Your data stays safe with us.",
    },
];
