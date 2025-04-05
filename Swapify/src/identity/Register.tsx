import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {validateConfirmPassword, validateEmail, validatePassword} from "../lib/utils.ts";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRevealPwd1, setIsRevealPwd1] = useState<boolean>(false);
  const [isRevealPwd2, setIsRevealPwd2] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const apiUrl = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async () => {
    if(password === "" || email === "")
    {
        setPasswordError("This field cannot be empty.");
        setConfirmPasswordError("This field cannot be empty.");
        return;
    }

    if(email === "")
    {
        setEmailError("This field cannot be empty.");
        return;
    }

    if(passwordError === "" && confirmPasswordError === "" && emailError === "") {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/connect/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            clientId: clientId,
            clientSecret: clientSecret
          }),
        });

        if (response.ok) {
          navigate("/email-notification?type=confirm-email");
        }

        if (!response.ok) {
          throw new Error("Register failed");
        }

        console.log("Register successful");
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
            sx={{...paperSection, ...registerContainerStyle}}
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
            Create a new account
          </Typography>
          <Divider sx={lineUpStyle}/>

          {loading ? <Box sx={{height:"228px", display: "flex", justifyContent: "center", alignItems: "center"}}> <CircularProgress /></Box> : (
          <span>
          <Box
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
          >
            <TextField
                type="email"
                value={email}
                required
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                  handleEmailChange(event);
                  validateEmail({email: event.target.value, setEmailError});
                }}
                label="Email"
                fullWidth
                error={!!emailError}
                helperText={emailError}
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
                type={isRevealPwd1 ? "text" : "password"}
                value={password}
                required
                onChange={handlePasswordChange}
                onBlur={() => validatePassword({password, setPasswordError})}
                label="Password"
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
                                  <VisibilityOffIcon/>
                              ) : (
                                  <VisibilityIcon/>
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
                onBlur={() => validateConfirmPassword({password, confirmPassword, setConfirmPasswordError})}
                label="Confirm password"
                fullWidth
                required
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
                                  <VisibilityOffIcon/>
                              ) : (
                                  <VisibilityIcon/>
                              )}
                            </IconButton>
                        )}
                      </InputAdornment>
                  ),
                }}
            />
          </Box>
          </span>)}

          <Box
              style={{
                display: "flex",
                justifyContent: "end",
              }}
          >
            <Button variant="outlined" sx={{height: "40px", width: '110px'}} onClick={() => navigate("/login")}>
                Cancel
            </Button>
            <Button
                variant="contained"
                onClick={handleRegister}
                disabled={loading}
                sx={registerButtonStyle}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const registerContainerStyle = {
  width: "500px",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
};

const registerButtonStyle = {
  marginLeft: "10px",
  height: "40px",
  borderRadius: "5px",
  width:'110px'
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
export default Register;
