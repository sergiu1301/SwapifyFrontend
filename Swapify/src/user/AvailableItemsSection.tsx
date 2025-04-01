import React from "react";
import {
    Typography,
    Grid,
    CardActions,
    Button,
    Box,
    Paper,
    Theme
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AvailableItemsSectionProps {
    theme:Theme
}

const AvailableItemsSection: React.FC<AvailableItemsSectionProps> = ({theme}) => {
    const navigate = useNavigate();

    const items = [
        {
            id: 1,
            name: "Camera",
            description: "Vintage Canon AE-1",
            owner: "john@example.com",
            image: "https://picsum.photos/seed/camera123/400/300"
        },
        {
            id: 2,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera124/400/300"
        },
        {
            id: 3,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera125/400/300"
        },
        {
            id: 4,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera126/400/300"
        },
        {
            id: 5,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera127/400/301"
        },
        {
            id: 6,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera128/400/301"
        },
        {
            id: 7,
            name: "Camera",
            description: "Vintage Canon AE-1",
            owner: "john@example.com",
            image: "https://picsum.photos/seed/camera129/400/301"
        },
        {
            id: 8,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera130/400/301"
        },
        {
            id: 9,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera131/400/301"
        },
        {
            id: 10,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera132/400/301"
        },
        {
            id: 11,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera133/400/301"
        },
        {
            id: 12,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera134/400/301"
        },
        {
            id: 13,
            name: "Camera",
            description: "Vintage Canon AE-1",
            owner: "john@example.com",
            image: "https://picsum.photos/seed/camera135/400/301"
        },
        {
            id: 14,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera136/400/301"
        },
        {
            id: 15,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera137/400/301"
        },
        {
            id: 16,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera138/400/301"
        },
        {
            id: 17,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera139/400/301"
        },
        {
            id: 18,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera140/400/301"
        },
        {
            id: 19,
            name: "Camera",
            description: "Vintage Canon AE-1",
            owner: "john@example.com",
            image: "https://picsum.photos/seed/camera141/400/301"
        },
        {
            id: 20,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera142/400/301"
        },
        {
            id: 21,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera143/400/301"
        },
        {
            id: 22,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera144/400/301"
        },
        {
            id: 23,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera145/400/301"
        },
        {
            id: 24,
            name: "Headphones",
            description: "Noise-cancelling, barely used",
            owner: "lucy@example.com",
            image: "https://picsum.photos/seed/camera146/400/301"
        }
    ];

    const handleViewItem = (id: number) => {
        navigate(`/user/items/${id}`);
    };

    return (
        <Box sx={{ p: "16px", flex: 1 }}>
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{mt:1}}>
                Available Items
            </Typography>
            <Box sx={{overflow: "auto",
                maxHeight: {
                    xs: "auto",
                    md: "calc(100vh - 120px)",
                },
                scrollbarWidth: "thin",
                p:2
            }}>
            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid item xs={12} md={4} key={item.id} >
                        <Paper
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid #ccc",
                                borderRadius: 2,
                                bgcolor: "background.default",
                                padding: 2,
                                "&:hover": {
                                    boxShadow: `0 0 10px ${theme.palette.mode === "dark" ? "#e3b43e" : "#f4e3b6"}`,
                                },
                            }}
                        >
                            {item.image && (
                                <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.name}
                                    sx={{
                                        width: "100%",
                                        height: 200,
                                        objectFit: "cover",
                                        borderRadius: 1,
                                        mb: 2,
                                    }}
                                />
                            )}
                            <Typography variant="subtitle1" fontWeight={600}>
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Typography variant="caption" sx={{ mt: 1 }}>
                                Owner: {item.owner}
                            </Typography>
                            <CardActions sx={{ mt: 1, justifyContent: "end" }}>
                                <Button variant="outlined" onClick={() => handleViewItem(item.id)}>View Item</Button>
                            </CardActions>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            </Box>
        </Box>
    );
};

export default AvailableItemsSection;
