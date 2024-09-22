import "./auth.css";
import Logo from "../../data/Logo.png";
import { useState } from "react";
import axios from "axios";
import { Error } from "../Common";

import Cookies from "js-cookie";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errMgs, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const hanldleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const api = `${import.meta.env.VITE_API_URL}/college/login/`;

    try {
      const response = await axios.post(api, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        if (response.data.data.employee_type === "Admin") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: response?.data?.data?.uid,
              name: response?.data?.data?.name,
              email: response?.data?.data?.email,
              employee_type: response?.data?.data?.employee_type,
              profile: response?.data?.data?.profile_image,
            })
          );
          // Cookies
          const access_token = response.data.access_token;
          const refresh_token = response.data.refresh_token;

          const accessTokenExpiry = new Date();
          accessTokenExpiry.setMinutes(accessTokenExpiry.getMinutes() + 59);

          Cookies.set("access_token", access_token, {
            expires: accessTokenExpiry,
          });

          const refreshTokenExpiry = new Date();
          refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 60);
          Cookies.set("refresh_token", refresh_token, {
            expires: refreshTokenExpiry,
          });

          window.location.href = " /";
        } else {
          setError(true);
          setErrMsg("User is not an Admin");
        }
      }
    } catch (error) {
      setError(true);
      setErrMsg("Email or Password is wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {error && <Error text={errMgs} setError={setError} />}
      <div className="logo-card">
        <div className="logo-containeer">
          <img src={Logo} alt="" />
        </div>
        <h1>Fast & Fresh</h1>
      </div>
      <div className="login-card">
        <div className="login-header">
          <div className="logo-containeer">
            <img src={Logo} alt="" />
          </div>
          <h2>Dashboard Login </h2>
        </div>
        <form>
          <div className="campus-input-container1 ">
            <div className="campus-input-card login-formCard">
              <label>Email:</label>
              <input
                type="email"
                placeholder="jhon@gmail.com"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campus-input-card login-formCard">
              <label>Password:</label>

              <input
                type="password"
                placeholder="******"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button className="subButton3 SubmitButton" onClick={hanldleSubmit}>
            {loading ? "Loading.." : "Submit"}
          </button>
        </form>
        <p className="forgetPasword">Forget Password</p>
      </div>
    </div>
  );
};
