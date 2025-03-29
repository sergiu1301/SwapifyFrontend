import React from "react";
import {Box, Button, Divider, IconButton, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import {useUserProfile} from "../UserProfileProvider";
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
        userName: userProfile?.userName || "",
    });

    React.useEffect(() => {
        if (userProfile) {
            setEditData({
                firstName: userProfile.firstName || "",
                lastName: userProfile.lastName || "",
                email: userProfile.email || "",
                phone: userProfile.phoneNumber || "",
                userName: userProfile.userName || "",
            });
        }
    }, [userProfile]);

    const handleTabChange = (_: React.SyntheticEvent ,newValue: number) => {
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
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Titlul "Profile" */}
            <Box sx={{ px: 3, py: 2 }}>
                <Typography variant="h4">Profile</Typography>
            </Box>

            {/* Taburi: Details | Security | Access */}
            <Box>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    TabIndicatorProps={{ style: { backgroundColor: "#daa520" } }} // culoare indicator
                >
                    <Tab label="Details" />
                    <Tab label="Security" />
                    <Tab label="Access" />
                </Tabs>
            </Box>
            <Divider/>
            {/* Conținutul fiecărui tab */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", maxHeight: "100vh" }}>
                {/* TAB 0: DETAILS */}
                <TabPanel value={tabValue} index={0}>
                    <Paper
                        sx={{
                            p: 2,
                            borderRadius: 1,
                        }}
                        elevation={3}
                    >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight:"40px"}}>
                            <Typography variant="h6">Personal Information</Typography>
                            {!isEditing ? (
                                <Box>
                                    <IconButton onClick={() => setIsEditing(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Box>
                                    <Button onClick={handleCancelEdit} variant="outlined" sx={{ mr: 1 }}>Cancel</Button>
                                    <Button
                                        variant="contained"
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
                                        <Typography sx={{width:"85px"}}>First name: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.firstName}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{width:"85px"}}>Last name: </Typography>
                                    <TextField
                                        variant="standard"
                                        value={editData.lastName}
                                        sx={{ width: "250px", marginLeft:"8px"}}
                                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                                    />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{width:"85px"}}>Email: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.email}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            inputProps={{readOnly:true}}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{width:"85px"}}>Username: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.userName}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            onChange={(e) => setEditData({ ...editData, userName: e.target.value })}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Typography sx={{width:"85px"}}>Phone: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.phone}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                        />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{width:"85px"}}>First name: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.firstName}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            inputProps={{readOnly:true}}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{width:"85px"}}>Last name: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.lastName}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            inputProps={{readOnly:true}}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{width:"85px"}}>Email: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.email}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            inputProps={{readOnly:true}}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography sx={{width:"85px"}}>Username: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.userName}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            inputProps={{readOnly:true}}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Typography sx={{width:"85px"}}>Phone: </Typography>
                                        <TextField
                                            variant="standard"
                                            value={editData.phone}
                                            sx={{ width: "250px", marginLeft:"8px"}}
                                            inputProps={{readOnly:true}}
                                        />
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Paper>
                </TabPanel>

                {/* TAB 1: SECURITY */}
                <TabPanel value={tabValue} index={1}>
                    <Paper
                        sx={{
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
                            p: 2,
                            borderRadius: 1,
                        }}
                        elevation={3}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Access
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                mt: 2
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{width:"125px"}}>Role Name: </Typography>
                                <TextField
                                    variant="standard"
                                    value={userProfile?.roleName}
                                    sx={{ width: "250px", marginLeft:"8px"}}
                                    inputProps={{readOnly:true}}
                                />
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{width:"125"}}>Role Description: </Typography>
                                <TextField
                                    variant="standard"
                                    value={userProfile?.roleDescription}
                                    sx={{ width: "250px", marginLeft:"8px"}}
                                    inputProps={{readOnly:true}}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </TabPanel>
            </Box>
        </Box>
    );
};

export default ProfilePage;
