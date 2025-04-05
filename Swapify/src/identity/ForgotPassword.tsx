import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  Paper,
  Grid,
  CircularProgress,
  useTheme
} from "@mui/material";
import {validateEmail} from "../lib/utils.ts";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const theme = useTheme();
  const apiUrl = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = async () => {
    if(email === "")
    {
      setEmailError("This field cannot be empty");
      return;
    }

    if(emailError === "") {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/v1/user/forgot-password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: email, clientId: clientId, clientSecret: clientSecret}),
        });

        if (!response.ok) {
          throw new Error("Register failed");
        }

        if (response.ok) {
          navigate("/email-notification?type=reset-password");
        }
      } catch (error) {
        console.error("Error register:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item sx={boxSection}>
        <Paper
          sx={{ ...paperSection, ...forgotPasswordContainerStyle }}
          elevation={10}
        >
          {/* 🎨 Background BLOBs - decorative, fixed */}
          <Box
              sx={{
                position: "fixed",
                top: "-100px",
                left: "-150px",
                width: "400px",
                height: "400px",
                backgroundColor: "#e3b43e",
                opacity: 0.1,
                filter: "blur(130px)",
                borderRadius: "50%",
                zIndex: 0,
                pointerEvents: "none",
              }}
          />
          <Box
              sx={{
                position: "fixed",
                bottom: "-100px",
                right: "-150px",
                width: "500px",
                height: "500px",
                backgroundColor: theme.palette.mode === "dark" ? "#ffffff22" : "#00000011",
                opacity: 0.1,
                filter: "blur(160px)",
                borderRadius: "50%",
                zIndex: 0,
                pointerEvents: "none",
              }}
          />
          <Typography
            style={{
              fontSize: "23px",
              fontWeight: "bold",
            }}
          >
            Forgot Password
          </Typography>
          <Divider sx={lineUpStyle} />
          <Box style={{ marginBottom: "20px" }}>
            <Typography
              style={{
                fontSize: "16px",
                display: "block",
                textAlign: "left",
                marginBottom: "12px",
                width: "auto",
              }}
            >
              {!loading && "Please enter your email to search for your account."}
            </Typography>
            {loading ? <Box sx={{height:"92px", paddingY:"12px"}}> <CircularProgress /></Box> :
                <TextField
                type="email"
                value={email}
                required
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                  handleEmailChange(event);
                  validateEmail({email: event.target.value, setEmailError});
                }}
                label="Enter your email"
                fullWidth
                error={!!emailError}
                helperText={emailError}
                />
            }
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
              <Button variant="outlined" sx={{height:"40px", width:'125px'}} onClick={()=>navigate("/login")}>
                Cancel
              </Button>
            <Button
              variant="contained"
              onClick={handleForgotPassword}
              disabled={loading}
              sx={resetPasswordButtonStyle}
            >
              Reset Password
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const forgotPasswordContainerStyle = {
  width: "500px",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
};

const resetPasswordButtonStyle = {
  marginLeft: "10px",
  height: "40px",
  borderRadius: "5px",
  width:'125px'
};

const lineUpStyle = {
  margin: "20px 0",
  border: "none",
  borderTop: "1px solid #ccc",
  width: "100%",
};

const boxSection = {
  flex: 1,
  height: "100%",
};

const paperSection = {
  paddingLeft: "16px",
  paddingRight: "16px",
  height: "100%",
};
export default ForgotPassword;
