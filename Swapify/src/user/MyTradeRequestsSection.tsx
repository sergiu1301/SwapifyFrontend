import { Card, CardContent, Typography, Stack, Chip, Box } from "@mui/material";

const dummyTrades = [
    { id: 1, item: "Skateboard", status: "Pending" },
    { id: 2, item: "Bookshelf", status: "Accepted" },
];

const MyTradeRequestsSection = () => (
    <Card>
        <CardContent>
            <Typography variant="h6" mb={2}>My Trade Requests</Typography>
            <Stack spacing={2}>
                {dummyTrades.map((trade) => (
                    <Box key={trade.id} sx={{ display: "flex", justifyContent: "space-between", p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                        <Typography>{trade.item}</Typography>
                        <Chip label={trade.status} color={
                            trade.status === "Pending" ? "warning" :
                                trade.status === "Accepted" ? "success" : "default"
                        } />
                    </Box>
                ))}
            </Stack>
        </CardContent>
    </Card>
);

export default MyTradeRequestsSection;
