import React from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    IconButton,
    TextField,
    Button
} from "@mui/material";
import { useUserProfile } from "../UserProfileProvider";
import EditIcon from "@mui/icons-material/Edit";

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
    const { children, value, index } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            sx={{
                flex: 1,
                display: value === index ? 'flex' : 'none',
                flexDirection: 'column',
                p: 2,
                overflow: 'auto',
                height: '100%',
            }}
        >
            {children}
        </Box>
    );
}

const ProfilePage: React.FC = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const [isEditing, setIsEditing] = React.useState(false);

    const { userProfile } = useUserProfile();

    const [editData, setEditData] = React.useState({
        firstName: userProfile?.firstName || "",
        lastName: userProfile?.lastName || "",
        email: userProfile?.email || "",
        phone: userProfile?.phoneNumber || "",
    });

    React.useEffect(() => {
        if (userProfile) {
            setEditData({
                firstName: userProfile.firstName || "",
                lastName: userProfile.lastName || "",
                email: userProfile.email || "",
                phone: userProfile.phoneNumber || "",
            });
        }
    }, [userProfile]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };


    const handleSaveEdit = () => {
        console.log("Saved values:", editData);
        // TODO: Aici apelezi endpointul pentru update dacă ai
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Poți reseta la valori originale dacă vrei
    };

    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: "#1e1e1e",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Titlul "Profile" */}
            <Box sx={{ px: 3, py: 2 }}>
                <Typography variant="h4">Profile</Typography>
            </Box>

            {/* Taburi: Details | Security | Access */}
            <Box sx={{ borderBottom: 1, borderColor: "#333", px: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="inherit"
                    TabIndicatorProps={{ style: { backgroundColor: "#3CB371" } }} // culoare indicator
                >
                    <Tab label="Details" />
                    <Tab label="Security" />
                    <Tab label="Access" />
                </Tabs>
            </Box>

            {/* Conținutul fiecărui tab */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", maxHeight: "100vh" }}>
                {/* TAB 0: DETAILS */}
                <TabPanel value={tabValue} index={0}>
                    <Paper
                        sx={{
                            backgroundColor: "#2a2a2a",
                            p: 2,
                            borderRadius: 1,
                        }}
                        elevation={3}
                    >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="h6">Personal Information</Typography>
                            {!isEditing ? (
                                <IconButton sx={editButtonStyle} onClick={() => setIsEditing(true)}>
                                    <EditIcon />
                                </IconButton>
                            ) : (
                                <Box>
                                    <Button onClick={handleCancelEdit} sx={{ mr: 1, color: "#ccc" }}>Cancel</Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#3CB371",
                                            textTransform: "none",
                                            "&:hover": { backgroundColor: "#2E8B57" },
                                        }}
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                mt: 2
                            }}
                        >
                            {isEditing ? (
                                <>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography>First Name: </Typography>
                                        <TextField
                                            label="First name"
                                            variant="outlined"
                                            value={editData.firstName}
                                            sx={{ width: "250px" }}
                                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography>Last Name: </Typography>
                                    <TextField
                                        label="Last name"
                                        variant="outlined"
                                        value={editData.lastName}
                                        sx={{ width: "250px" }}
                                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                                    />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography>Email: </Typography>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            value={editData.email}
                                            sx={{ width: "250px", '& .MuiInput-underline:before': {
                                                    borderBottomColor: '#555',
                                                },
                                                '& .MuiInput-underline:hover:before': {
                                                    borderBottomColor: '#888',
                                                },
                                                '& .MuiInput-underline:after': {
                                                    borderBottomColor: '#3CB371',
                                                },}}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Typography>Phone: </Typography>
                                        <TextField
                                            variant="outlined"
                                            value={editData.phone}
                                            sx={{ width: "250px" }}
                                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                        />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Typography>First name: <b>{editData.firstName || "-"}</b></Typography>
                                    <Typography>Last name: <b>{editData.lastName || "-"}</b></Typography>
                                    <Typography>Email: <b>{editData.email || "-"}</b></Typography>
                                    <Typography>Email: <b>{editData.userName || "-"}</b></Typography>
                                    <Typography>Phone: <b>{editData.phone || "-"}</b></Typography>
                                </>
                            )}
                        </Box>
                    </Paper>
                </TabPanel>

                {/* TAB 1: SECURITY */}
                <TabPanel value={tabValue} index={1}>
                    <Paper
                        sx={{
                            backgroundColor: "#2a2a2a",
                            p: 2,
                            borderRadius: 1,
                        }}
                        elevation={3}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Security
                        </Typography>
                        <Typography>
                            Aici poți afișa setările de securitate (ex: parole, 2FA, etc.).
                        </Typography>
                    </Paper>
                </TabPanel>

                {/* TAB 2: ACCESS */}
                <TabPanel value={tabValue} index={2}>
                    <Paper
                        sx={{
                            backgroundColor: "#2a2a2a",
                            p: 2,
                            borderRadius: 1,
                        }}
                        elevation={3}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Access
                        </Typography>
                        <Typography>
                            Aici poți afișa drepturile de acces, permisiunile userului, etc.
                        </Typography>
                    </Paper>
                </TabPanel>
            </Box>
        </Box>
    );
};

const editButtonStyle = {
    backgroundColor: "transparent",
    color: "#ccc",
    cursor: "pointer",
    alignContent: "center",
    "&:hover": {
        color: "#fff",
    },
};

export default ProfilePage;
