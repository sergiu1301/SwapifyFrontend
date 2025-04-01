import React from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SwapHoriz, Inventory2, Lock, Search } from "@mui/icons-material";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                maxWidth: "100vw",
                backgroundColor: theme.palette.background.default,
                position: "relative",
                m: 2,
                zIndex: 0,
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
                    overFlow: "hidden",
                    maxWidth: "100vw",
                    maxHeight: "100vh",
                    mx: "auto",
                    pt: 2,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box
                    component="img"
                    src="../src/assets/undraw_deliveries_yellow_adjusted.svg"
                    alt="Landing visual"
                    sx={{
                        width: "100%",
                        maxWidth: "70%",
                        objectFit: "contain",
                        mx: "auto",
                        mb: 4,
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
                    mb={5}
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
                    variant="h4"
                    fontWeight={700}
                    textAlign="center"
                    mb={6}
                    mt={6}
                >
                    What can you do with Swapify?
                </Typography>

                <Grid container spacing={4}>
                    {features.map((feature) => (
                        <Grid item xs={12} sm={6} md={3} sx={{mb:2}} key={feature.title}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    borderRadius: 4,
                                    height: "230px",
                                    transition: "0.3s ease",
                                    "&:hover": {
                                        boxShadow: `0 0 15px ${theme.palette.mode === "dark" ? "#e3b43e44" : "#f4e3b6"}`,
                                        transform: "translateY(-4px)",
                                    },
                                }}
                            >
                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
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
