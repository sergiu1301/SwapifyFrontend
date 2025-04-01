import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box
} from "@mui/material";

const mockItems = [
    {
        id: 1,
        name: "Camera",
        description: "Vintage Canon AE-1, perfect for film photography lovers.",
        owner: "john@example.com",
        condition: "Excellent",
        location: "New York, NY"
    },
    {
        id: 2,
        name: "Headphones",
        description: "Noise-cancelling over-ear headphones, barely used.",
        owner: "lucy@example.com",
        condition: "Like New",
        location: "San Francisco, CA"
    },
];

const ItemDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = mockItems.find(i => i.id === Number(id));

    if (!item) {
        return <Typography>Item not found.</Typography>;
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Card sx={{ maxWidth: 600, width: "100%" }}>
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {item.description}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Owner:</strong> {item.owner}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Condition:</strong> {item.condition}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        <strong>Location:</strong> {item.location}
                    </Typography>
                    <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ItemDetails;
