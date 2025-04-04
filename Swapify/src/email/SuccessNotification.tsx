import React, { useEffect, useState } from "react";
import checkImg from "../assets/new-checked.svg";
import {  Button, Grid, Divider, Typography, Paper, Box } from "@mui/material";
import { useNavigate} from "react-router-dom";

const SuccessNotification: React.FC = () => {
  const [typePage, setTypePage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const typePageFromUrl = searchParams.get("type");

        if (!typePageFromUrl) {
          throw new Error("Page not found");
        }

        setTypePage(typePageFromUrl);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
const navigate = useNavigate();
  return (
    <Grid container spacing={2} sx={{width: "400px", height: "230px"}}>
      <Grid item sx={boxSection}>
        <Paper
          sx={{ ...paperSection, ...emailConfirmedContainerStyle }}
          elevation={10}
        >
          {typePage === "confirm-email" && (
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: "bold",
              }}
            >
              Your email is confirmed
            </Typography>
          )}
          {typePage === "reset-password" && (
            <Typography
              style={{
                fontSize: "23px",
                fontWeight: "bold",
              }}
            >
              Your password has been reset
            </Typography>
          )}
          <Divider sx={lineUpStyle} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img
              src={checkImg}
              alt="Not confirmed email"
              style={{ width: "72px", height: "72px", }}
            />
            <Button variant="text" sx={loginButtonStyle} onClick={()=>{navigate("/")}}>
              Back to login page
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const emailConfirmedContainerStyle = {
  width: "400px",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
};

const lineUpStyle = {
  margin: "20px 0",
  border: "none",
  borderTop: "1px solid #ccc",
  width: "100%",
};

const loginButtonStyle = {
  textTransform: "unset",
  backgroundColor: "transparent",
  textAlign: "right",
  width: "150px",
  cursor: "pointer",
  fontSize: "15px",
  marginTop: "7px",
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

export default SuccessNotification;
