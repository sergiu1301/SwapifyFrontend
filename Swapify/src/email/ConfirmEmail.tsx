import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";

const ConfirmEmail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const urlUserId = searchParams.get("userId");
        const token = searchParams.get("token");

        if (!urlUserId || urlUserId.length != 36 || !token) {
          throw new Error("Url has not a good format");
        }

        const response = await fetch(
          `${apiUrl}/api/v1/user/confirm-email?userId=${urlUserId}&token=${encodeURIComponent(token)}`, {
            method: "GET"
        });

        if (!response.ok) {
          navigate("/success-notification?type=confirm-email");
          throw new Error("Network response was not ok");
        }

      } catch (error) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
    <Box sx={{height:"92px", paddingY:"12px"}}>
      <CircularProgress />
    </Box>
    );
  }

  return null;
};

export default ConfirmEmail;
