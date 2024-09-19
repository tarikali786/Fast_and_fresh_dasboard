import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import Cookies from "js-cookie";
import axios from "axios";

// Utility to refresh access token
const refreshAccessToken = async (refresh_token) => {
  const api = `${import.meta.env.VITE_API_URL}/college/refresh-token/`;
  try {
    const response = await axios.post(
      api,
      { refresh: refresh_token },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200) {
      const newAccessToken = response.data.access;

      // Set token expiration to 59 minutes
      const accessTokenExpiry = new Date();
      accessTokenExpiry.setMinutes(accessTokenExpiry.getMinutes() + 59);

      // Store the new access token in cookies
      Cookies.set("access_token", newAccessToken, {
        expires: accessTokenExpiry,
      });

      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");

  // Handle token refresh at a set interval (every 59 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (refresh_token) {
        refreshAccessToken(refresh_token);
      }
    }, 59 * 60 * 1000); 

    return () => clearInterval(interval); 
  }, [refresh_token]);

  // Refresh token immediately if access_token is missing but refresh_token is available
  useEffect(() => {
    if (!access_token && refresh_token) {
      const handleInitialTokenRefresh = async () => {
        const refreshed = await refreshAccessToken(refresh_token);
        if (!refreshed) {
          navigate("/login");
        }
      };
      handleInitialTokenRefresh();
    } else if (!access_token && !refresh_token) {
      navigate("/login");
    }
  }, [access_token, refresh_token, navigate]);

  // Handle navigation based on token status and pathname
  useEffect(() => {
    if (access_token && pathname === "/login") {
      navigate("/");
    } else if (!access_token && pathname !== "/login") {
      navigate("/login");
    }
  }, [access_token, pathname, navigate]);

  return <>{pathname === "/login" ? <Layout2 /> : <Layout1 />}</>;
};

export default App;
