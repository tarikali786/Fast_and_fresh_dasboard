import { Outlet } from "react-router-dom";
import Structur from "../Common/Structur";

const Layout1 = () => {
  return (
    <>
      <Structur />
      <Outlet />
    </>
  );
};

export default Layout1;
