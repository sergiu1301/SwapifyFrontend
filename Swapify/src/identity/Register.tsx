import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography,} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  const apiUrl = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const validateEmail = (email: string): boolean => {
    const re =
      /^(?!.{255})(?![^@]{65})((([^<>()\[\]\\.,;:\s@""]+(\.[^<>()\[\]\\.,;:\s@""]+)*)|("".+"")))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email))) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

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
  };

  return (
    <Grid container spacing={2}>
      <Grid item sx={boxSection}>
        <Paper
            sx={{...paperSection, ...registerContainerStyle}}
            elevation={10}
        >
          <Typography
              style={{
                fontSize: "23px",
                fontWeight: "bold",
              }}
          >
            Create a new account
          </Typography>
          <Divider sx={lineUpStyle}/>

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
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                  handleEmailChange(event);
                  validateEmail(event.target.value);
                }}
                onBlur={() => validateEmail(email)}
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
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
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
                onBlur={() => validateConfirmPassword(password, confirmPassword)}
                label="Confirm password"
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
          </span>

          <Box
              style={{
                display: "flex",
                justifyContent: "end",
              }}
          >
            <Button variant="outlined" sx={{height: "40px", width: '110px'}} onClick={() => navigate("/")}>
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
