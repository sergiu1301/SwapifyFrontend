import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useUserProfile } from "../UserProfileProvider.tsx";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false);
  const { setUserProfile } = useUserProfile();
  const apiUrl = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("email", email);
      formData.append("password", password);
      formData.append("client_id", clientId);
      formData.append("client_secret", clientSecret);

      const response = await fetch(`${apiUrl}/connect/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      });

      if (!response.ok) {
        setErrorMessage("Invalid email or password.");
        setLoading(false);
        return;
      }

      const tokenData = await response.json();
      localStorage.setItem("jwtToken", tokenData.access_token);

      const responseProfile = await fetch(`${apiUrl}/api/v1/user`, {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });

      if (!responseProfile.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const profile = await responseProfile.json();
      console.log(profile);
      setUserProfile(profile);
      setErrorMessage("");

      if (profile.roleName === "admin") {
        navigate("/dashboard_admin/manage?type=Users");
      } else if (profile.roleName === "user") {
        navigate("/dashboard_user/manage_rooms");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Oops, something's wrong. Please come back later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item sx={boxSection}>
        <Paper sx={{ ...paperSection, ...loginContainerStyle }} elevation={10}>
          <Box>
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: "bold",
              }}
            >
              Log Into Visi
            </Typography>
            <Divider sx={lineUpStyle} />
            <Box
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <TextField
                type="email"
                value={email}
                onChange={handleEmailChange}
                label="Enter your email"
                fullWidth
              />
            </Box>
            <Box
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <TextField
                  type={isRevealPwd ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  label="Enter your password"
                  fullWidth
                />
                {password.length > 0 && (
                  <IconButton
                    sx={eyeButtonStyle}
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  >
                    {isRevealPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box style={{ marginBottom: "10px" }}>
              <Typography style={{ fontWeight: "initial" }} color="error">
                {errorMessage}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
              sx={loginButtonStyle}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
            <Box style={{ marginTop: "10px" }}>
              <Link to="/forgot_password" style={{ textDecoration: "none" }}>
                <Button
                  color="primary"
                  variant="text"
                  sx={forgotPasswordButtonStyle}
                >
                  Forgot Password?
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button color="primary" variant="text" sx={signUpButtonStyle}>
                  Sign up for Visi
                </Button>
              </Link>
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography sx={{ mx: 2, color: "text.secondary" }}>
                or
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const loginContainerStyle = {
  width: "100%",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
};

const loginButtonStyle = {
  textTransform: "unset",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  backgroundColor: "#2E8B57",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#25764F",
  },
};

const forgotPasswordButtonStyle = {
  textTransform: "unset",
  fontSize: "13px",
  backgroundColor: "transparent",
  color: "#2E8B57",
  textAlign: "right",
  width: "150px",
  paddingRight: "0",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#1F6D42",
  },
};

const signUpButtonStyle = {
  textTransform: "unset",
  fontSize: "13px",
  backgroundColor: "transparent",
  color: "#2E8B57",
  textAlign: "left",
  width: "150px",
  paddingLeft: "0",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#1F6D42",
  },
};

const lineUpStyle = {
  margin: "20px 0",
  border: "none",
  borderTop: "1px solid #ccc",
  width: "100%",
};

const eyeButtonStyle = {
  backgroundColor: "transparent",
  position: "absolute",
  right: "0",
  top: "50%",
  transform: "translateY(-50%)",
  "&:hover": {
    backgroundColor: "transparent",
    color: "black",
  },
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
export default Login;
