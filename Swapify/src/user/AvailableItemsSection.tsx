import React from "react";
import {
    Typography,
    Box,
    Paper,
    Button,
    CardActions,
    Theme
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AvailableItemsSectionProps {
    theme: Theme;
}

const AvailableItemsSection: React.FC<AvailableItemsSectionProps> = ({ theme }) => {
    const navigate = useNavigate();

    const items = Array.from({ length: 24 }).map((_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
        description:
            "Experience the ultimate in audio immersion with our high-end noise-cancelling headphones. Designed for discerning listeners, these headphones combine advanced acoustic engineering with luxurious comfort. Featuring deep bass, clear mids, and crisp highs, every note is delivered with stunning clarity. The over-ear design ensures passive noise isolation, while the active noise-cancelling technology eliminates external distractions, letting you focus on what matters — your music. Whether you're commuting, working, or relaxing, the plush ear cushions and adjustable headband provide an exceptional fit for hours on end.\n" +
            "\n" +
            "  Crafted from premium materials, they’re built to last, with foldable hinges for compact storage. The battery life exceeds 30 hours on a single charge, and a quick 10-minute boost provides up to 5 hours of playback — perfect for life on the go. Intuitive touch controls allow you to pause, skip, and adjust volume without reaching for your device. The integrated microphone enables crystal-clear calls and voice assistant access with a single tap.\n" +
            "\n" +
            "  These headphones support multi-point connectivity, so you can seamlessly switch between your phone, laptop, and tablet. Whether you're deep into a podcast, gaming with friends, or zoning out with white noise, they adapt to your needs. Available in a sleek matte black finish with subtle gold accents, they complement any style. Take your listening to the next level with these headphones that merge sound, style, and innovation into one elegant package. Once you try them, you'll never want to listen on anything else.",
        owner: `user${index}@example.com`,
        image: `https://picsum.photos/seed/item${index + 1}/400/300`
    }));

    const handleViewItem = (id: number) => {
        navigate(`/items/${id}`);
    };

    const truncateDescription = (text: string, wordLimit = 25): string => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    return (
        <Box
            sx={{
                padding: "16px",
                flex: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h5">Home</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2.2,
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 148px)",
                }}
            >
                {items.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            justifyContent: "space-between",
                            width: {
                                xs: "100%",
                                sm: "calc(50% - 12px)",
                                md: "calc(33.333% - 16px)",
                            },
                            flexShrink: 0,
                            mt:0.5,
                            ml:0.25,
                            mb:0.5,
                            mr:0.25
                        }}
                    >
                        <Paper
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid #ccc",
                                borderRadius: 2,
                                backgroundColor: "background.default",
                                padding: 2,
                                "&:hover": {
                                    boxShadow: `0 0 7px ${theme.palette.mode === "dark" ? "#e3b43e" : "#f4e3b6"}`,
                                },
                            }}
                        >
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
                            <Typography variant="subtitle1" fontWeight={600}>
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {truncateDescription(item.description)}
                            </Typography>
                            <Typography variant="caption" sx={{ mt: 1 }}>
                                Owner: {item.owner}
                            </Typography>
                            <CardActions sx={{ mt: 1, justifyContent: "end" }}>
                                <Button variant="outlined" onClick={() => handleViewItem(item.id)}>
                                    View Item
                                </Button>
                            </CardActions>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AvailableItemsSection;
