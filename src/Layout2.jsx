import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Auth/Login";

const Layout2 = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Layout2;
