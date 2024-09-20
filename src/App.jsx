import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Unauthorized from "./Unauthorized";
import Authorized from "./Authorized";
import { RefreshAccessToken } from "./utils";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(Cookies.get("access_token"));
  const refresh_token = Cookies.get("refresh_token");

  const handleInitialTokenRefresh = async () => {
    const refreshed = await RefreshAccessToken(refresh_token, setAccessToken);
    if (!refreshed) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (refresh_token) {
        refreshAccessToken(refresh_token, setAccessToken);
      }
    }, 59 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refresh_token]);

  useEffect(() => {
    if (!accessToken && refresh_token) {
      handleInitialTokenRefresh();
    } else if (!accessToken && !refresh_token) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refresh_token, navigate]);

  useEffect(() => {
    if (accessToken && pathname === "/login") {
      navigate("/");
    } else if (!accessToken && pathname !== "/login") {
      navigate("/login");
    }
  }, [accessToken, pathname, navigate]);

  return <>{pathname === "/login" ? <Unauthorized /> : <Authorized />}</>;
};

export default App;
