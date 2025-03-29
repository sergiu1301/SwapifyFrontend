import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Divider,
  Button,
  InputAdornment,
  Paper,
  Grid,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const NewPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRevealPwd1, setIsRevealPwd1] = useState<boolean>(false);
  const [isRevealPwd2, setIsRevealPwd2] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const validatePassword = (password: string): boolean => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$%^&£*\-_+=[\]{}|\\:',?\/`~""()<>;!]{10,32}$/;

    if (!re.test(String(password))) {
      setPasswordError(
        "The password must contain uppercase, lowercase letters, special characters and numbers",
      );
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 10 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSetPassword = async () => {
    if (passwordError === "" && confirmPasswordError === "") {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(location.search);
        const urlUserId = searchParams.get("userId");
        const token = searchParams.get("token");

        if (!urlUserId || urlUserId.length != 36 || !token) {
          throw new Error("Url has not a good format");
        }

        const response = await fetch(
          `${apiUrl}/api/v1/user/reset-password?userId=${urlUserId}&token=${encodeURIComponent(token)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: password, clientId: clientId, clientSecret: clientSecret }),
          },
        );

        if (!response.ok) {
          navigate("/no-success-notification?type=reset-password");
          throw new Error("Failed to set new password");
        }
        navigate("/success-notification?type=reset-password");
      } catch (error) {
        console.error("Error setting new password:", error);
        navigate("/no-success-notification?type=reset-password");
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item sx={boxSection}>
        <Paper
          sx={{ ...paperSection, ...newPasswordContainerStyle }}
          elevation={10}
        >
          <Box>
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: "bold",
              }}
            >
              Reset password
            </Typography>
            <Divider sx={lineUpStyle} />
            <Box
              style={{
                width: "100%",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <TextField
                type={isRevealPwd1 ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                label="New password"
                fullWidth
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {password.length > 0 && (
                        <IconButton
                          sx={eyeButtonStyle}
                          onClick={() =>
                            setIsRevealPwd1((prevState) => !prevState)
                          }
                        >
                          {isRevealPwd1 ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              style={{
                width: "100%",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <TextField
                type={isRevealPwd2 ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() =>
                  validateConfirmPassword(password, confirmPassword)
                }
                label="Confirm new password"
                fullWidth
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {confirmPassword.length > 0 && (
                        <IconButton
                          sx={eyeButtonStyle}
                          onClick={() =>
                            setIsRevealPwd2((prevState) => !prevState)
                          }
                        >
                          {isRevealPwd2 ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleSetPassword}
              disabled={loading}
              sx={setPasswordButtonStyle}
            >
              {loading ? "Set password..." : "Set password"}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const newPasswordContainerStyle = {
  width: "500px",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
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

const lineUpStyle = {
  margin: "20px 0",
  border: "none",
  borderTop: "1px solid #ccc",
  width: "100%",
};

const setPasswordButtonStyle = {
  textTransform: "unset",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
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

export default NewPassword;
