import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Typography,
    Button,
    Box,
    Divider,
    useTheme,
    Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImageCoverflow from "./ImageCoverflow";
import ExpandableDescription from "./ExpandableDescription";

const conditions = ["New", "Like New", "Good", "Fair", "Used"];
const locations = ["New York, NY", "San Francisco, CA", "Los Angeles, CA", "Austin, TX", "Chicago, IL"];

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
    images: [
        `https://picsum.photos/seed/item${index + 1}/800/400`,
        `https://picsum.photos/seed/item${index + 1}-1/800/400`,
        `https://picsum.photos/seed/item${index + 1}-2/800/400`,
        `https://picsum.photos/seed/item${index + 1}-3/800/400`,
        `https://picsum.photos/seed/item${index + 1}-4/800/400`,
        `https://picsum.photos/seed/item${index + 1}-5/800/400`,
        `https://picsum.photos/seed/item${index + 1}-6/800/400`,
        `https://picsum.photos/seed/item${index + 1}-7/800/400`,
        `https://picsum.photos/seed/item${index + 1}-8/800/400`,
        `https://picsum.photos/seed/item${index + 1}-9/800/400`,
        `https://picsum.photos/seed/item${index + 1}-10/800/400`,
        `https://picsum.photos/seed/item${index + 1}-11/800/400`,
        `https://picsum.photos/seed/item${index + 1}-12/800/400`,
        `https://picsum.photos/seed/item${index + 1}-13/800/400`,
        `https://picsum.photos/seed/item${index + 1}-14/800/400`,
        `https://picsum.photos/seed/item${index + 1}-15/800/400`,
    ],
    condition: conditions[index % conditions.length],
    location: locations[index % locations.length],
}));

const ItemDetails: React.FC = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const item = items.find((i) => i.id === Number(id));

    if (!item) {
        return <Typography>Item not found.</Typography>;
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                overflowX: "auto",
                overflowY: "auto",
            }}
        >
            <Box sx={{ maxWidth: "100%", mx: "auto", mb:5}}>
                <ImageCoverflow images={item.images} />

                <Divider />

                <Box
                    sx={{
                        borderRadius: 4,
                        p: { xs: 2, md: 4 },
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            rowGap: 2,
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{
                                letterSpacing: "-0.5px",
                                fontSize: {
                                    xs: "1.8rem",
                                    sm: "2rem",
                                    md: "2.2rem",
                                },
                                mb: 1,
                            }}
                        >
                            {item.name}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                            >
                                Go Back
                            </Button>

                            <Button
                                variant="contained"
                                sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                                onClick={() => alert("Initiate trade")}
                            >
                                Trade
                            </Button>
                        </Box>
                    </Box>

                    <Typography
                        variant="body1"
                        paragraph
                        sx={{
                            fontSize: "1rem",
                            lineHeight: 1.75,
                            textAlign: "justify",
                        }}
                    >
                        <ExpandableDescription text={item.description} />
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={2} mb={3}>
                        {/* Owner */}
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
                                    border: "1px solid",
                                    borderColor: theme.palette.divider,
                                    boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255,255,255,0.05)" : "0 2px 10px rgba(0,0,0,0.05)",
                                    borderRadius: 3,
                                    p: 2,
                                    gap: 2,
                                }}
                            >
                                <PersonIcon fontSize="medium" sx={{ color: "primary.main" }} />
                                <Box>
                                    <Typography
                                        fontWeight={600}
                                        fontSize={14}
                                        color="text.secondary"
                                        sx={{ letterSpacing: "0.5px" }}
                                    >
                                        Owner
                                    </Typography>
                                    <Typography variant="body2" fontSize={15} fontWeight={500}>
                                        {item.owner}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Condition */}
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
                                    border: "1px solid",
                                    borderColor: theme.palette.divider,
                                    boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255,255,255,0.05)" : "0 2px 10px rgba(0,0,0,0.05)",
                                    borderRadius: 3,
                                    p: 2,
                                    gap: 2,
                                }}
                            >
                                <CheckCircleIcon fontSize="medium" sx={{ color: "success.main" }} />
                                <Box>
                                    <Typography
                                        fontWeight={600}
                                        fontSize={14}
                                        color="text.secondary"
                                        sx={{ letterSpacing: "0.5px" }}
                                    >
                                        Condition
                                    </Typography>
                                    <Typography variant="body2" fontSize={15} fontWeight={500}>
                                        {item.condition}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Location */}
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
                                    border: "1px solid",
                                    borderColor: theme.palette.divider,
                                    boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(255,255,255,0.05)" : "0 2px 10px rgba(0,0,0,0.05)",
                                    borderRadius: 3,
                                    p: 2,
                                    gap: 2,
                                }}
                            >
                                <LocationOnIcon fontSize="medium" sx={{ color: "error.main" }} />
                                <Box>
                                    <Typography
                                        fontWeight={600}
                                        fontSize={14}
                                        color="text.secondary"
                                        sx={{ letterSpacing: "0.5px" }}
                                    >
                                        Location
                                    </Typography>
                                    <Typography variant="body2" fontSize={15} fontWeight={500}>
                                        {item.location}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Box>
    );
};

export default ItemDetails;
