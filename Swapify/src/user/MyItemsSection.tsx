import { Card, CardContent, Typography, Button, Stack, Box } from "@mui/material";

const dummyItems = [
    { name: "Vintage Watch", description: "Swiss made, 1970s" },
    { name: "Guitar", description: "Fender Stratocaster" },
];

const MyItemsSection = () => (
    <Card>
        <CardContent>
            <Typography variant="h6" mb={2}>My Items</Typography>
            <Stack spacing={2}>
                {dummyItems.map((item, index) => (
                    <Box key={index} sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
                        <Typography fontWeight="bold">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                    </Box>
                ))}
                <Button>Add New Item</Button>
            </Stack>
        </CardContent>
    </Card>
);

export default MyItemsSection;
