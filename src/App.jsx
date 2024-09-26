import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Unauthorized from "./Unauthorized";
import Authorized from "./Authorized";
import { RefreshAccessToken } from "./utils";
import { Loading } from "./Component";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(Cookies.get("access_token"));
  const refresh_token = Cookies.get("refresh_token");

  const handleInitialTokenRefresh = async () => {
    setLoading(true); // Set loading to true before the API call
    const refreshed = await RefreshAccessToken(refresh_token, setAccessToken);
    setLoading(false); // Set loading to false after the API call
    if (!refreshed) {
      navigate("/login");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Initial loading after 1 second
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (refresh_token) {
        setLoading(true); // Set loading before token refresh
        RefreshAccessToken(refresh_token, setAccessToken).finally(() => {
          setLoading(false); // Set loading to false after refresh
        });
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

  if (loading) return <Loading />;

  return <>{pathname === "/login" ? <Unauthorized /> : <Authorized />}</>;
};

export default App;
