import Cookies from "js-cookie";
import axios from "axios";
import { get } from "./hooks/api";

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

export const fetchEmployeeList = async () => {
  try {
    const employeeApi = `${import.meta.env.VITE_API_URL}/college/all-employee/`;
    const response = await get(employeeApi);
    if (response?.data?.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch employee list", error);
  }
};

export const fetchEmployeTypeList = async (type) => {
  try {
    const employeeApi = `${
      import.meta.env.VITE_API_URL
    }/college/all-employee/?q=${type}`;
    const response = await get(employeeApi);
    if (response?.data?.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch employee list", error);
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const formattedTime = `${hours}:${minutes}${ampm}`;

  return `${day}-${month}-${year} T ${formattedTime}`;
};