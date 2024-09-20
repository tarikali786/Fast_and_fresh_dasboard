import { Route, Routes } from "react-router-dom";
import { Login } from "./Component/Auth";

const Unauthorized = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Unauthorized;
