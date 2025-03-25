import React from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Button
} from "@mui/material";

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
    const { children, value, index } = props;
    return (
        <div hidden={value !== index} style={{ width: "100%" }}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}

const ProfilePage: React.FC = () => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#1e1e1e", // Fundal întunecat
                color: "#fff",              // Text alb
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
            <Box sx={{ p: 2 }}>
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
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Personal Information
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography>First name: <b>Suciu</b></Typography>
                                <Typography>Last name: <b>Sergiu</b></Typography>
                                <Typography>Email: <b>sergiusuciu2002@gmail.com</b></Typography>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#3CB371",
                                    textTransform: "none",
                                    "&:hover": { backgroundColor: "#2E8B57" },
                                }}
                            >
                                Edit
                            </Button>
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

export default ProfilePage;
