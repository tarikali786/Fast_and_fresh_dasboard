import Cookies from "js-cookie";
import axios from "axios";

export const RefreshAccessToken = async (refresh_token, setAccessToken) => {
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

      // Update the access token state
      setAccessToken(newAccessToken);

      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};
