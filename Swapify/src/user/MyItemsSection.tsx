import React, { useState } from "react";
import {
    Typography,
    Box,
    Paper,
    Button,
    CardActions,
    Theme,
    TextField,
    MenuItem,
    Grid,
    FormHelperText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from "@mui/icons-material/Close";

interface MyItemsSectionProps {
    theme: Theme;
}

const conditionOptions = ["New", "Like New", "Good", "Fair", "Used"];
const locationOptions = ["New York, NY", "San Francisco, CA", "Los Angeles, CA", "Austin, TX", "Chicago, IL"];

const MyItemsSection: React.FC<MyItemsSectionProps> = ({ theme }) => {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        condition: "",
        location: "",
        images: [] as string[],
    });
    const [errors, setErrors] = useState({
        name: false,
        description: false,
        condition: false,
        location: false,
        images: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            const totalImages = newItem.images.length + newImages.length;
            if (totalImages > 12) return;
            setNewItem((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
            setErrors((prev) => ({ ...prev, images: false }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: newItem.name === "",
            description: newItem.description === "",
            condition: newItem.condition === "",
            location: newItem.location === "",
            images: newItem.images.length === 0
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleAddItem = () => {
        if (!validateForm()) return;
        setItems([...items, { ...newItem, id: items.length + 1 }]);
        setNewItem({ name: "", description: "", condition: "", location: "", images: [] });
        setDialogOpen(false);
    };

    const handleViewItem = (id: number) => {
        navigate(`/items/${id}`);
    };

    const ItemForm = (
        <Grid container spacing={2} mt={1} sx={{ maxHeight: "100vh", overflowY: "auto" }}>
            <Grid item xs={12} sm={4}>
                <TextField
                    name="name"
                    label="Item Name"
                    fullWidth
                    required
                    error={errors.name}
                    value={newItem.name}
                    onChange={handleInputChange}
                    helperText={errors.name && "Required"}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    name="location"
                    label="Location"
                    select
                    required
                    fullWidth
                    error={errors.location}
                    value={newItem.location}
                    onChange={handleInputChange}
                    helperText={errors.location && "Required"}
                >
                    {locationOptions.map(loc => (
                        <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    name="condition"
                    label="Condition"
                    select
                    required
                    fullWidth
                    error={errors.condition}
                    value={newItem.condition}
                    onChange={handleInputChange}
                    helperText={errors.condition && "Required"}
                >
                    {conditionOptions.map(c => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    required
                    error={errors.description}
                    value={newItem.description}
                    onChange={handleInputChange}
                    helperText={errors.description && "Required"}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<AddPhotoAlternateIcon />}
                    disabled={newItem.images.length >= 12}
                >
                    Upload Images ({newItem.images.length}/12)
                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleAddImage}
                    />
                </Button>
                {errors.images && <FormHelperText error>Please upload at least one image.</FormHelperText>}
                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                    {newItem.images.map((img, idx) => (
                        <Box
                            key={idx}
                            component="img"
                            src={img}
                            alt={`preview-${idx}`}
                            sx={{ width: 100, height: 100, borderRadius: 1, objectFit: "cover" }}
                        />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );

    return (
        <Box sx={{ padding: "16px", flex: 1, height: "100vh", overflow: "auto" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h5">My Inventory</Typography>
                {items.length > 0 && (
                    <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Item</Button>
                )}
            </Box>

            {items.length === 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        You haven't added any items yet
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Add your first item and start sharing your collection!
                    </Typography>
                    <Box mt={3}>{ItemForm}</Box>
                    <Box mt={2}>
                        <Button variant="contained" onClick={handleAddItem}>Add Item</Button>
                    </Box>
                </Box>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2.2,
                    mt: 3,
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 200px)",
                }}
            >
                {items.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
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
                                "&:hover": {
                                    boxShadow: `0 0 7px ${theme.palette.mode === "dark" ? "#e3b43e" : "#f4e3b6"}`,
                                },
                                padding: 2,
                                height: "100%",
                            }}
                        >
                            {item.images[0] && (
                                <Box
                                    component="img"
                                    src={item.images[0]}
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
                                {item.description.split(" ").slice(0, 25).join(" ")}...
                            </Typography>
                            <Typography variant="caption" sx={{ mt: 1 }}>
                                Condition: {item.condition} — Location: {item.location}
                            </Typography>
                            <CardActions sx={{ mt: 1, justifyContent: "end" }}>
                                <Button variant="outlined" onClick={() => handleViewItem(item.id)}>View Item</Button>
                            </CardActions>
                        </Paper>
                    </Box>
                ))}
            </Box>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Add Item</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setDialogOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ maxHeight: "75vh" }}>{ItemForm}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} variant="outlined">Cancel</Button>
                    <Button variant="contained" onClick={handleAddItem}>Add Item</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyItemsSection;
