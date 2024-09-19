import { AiOutlineMenu } from "react-icons/ai";

import { RiNotification3Line } from "react-icons/ri";
import avatar from "../../data/avatar.jpg";
import { useStateContext } from "../../contexts/contextProvider";

import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import Cookies from "js-cookie";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <div title={title}>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </div>
);
export const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,

    handleClick,
    screenSize,
    setscreenSize,
    currentColor,
  } = useStateContext();
  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  const access_token = Cookies.get("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    localStorage.removeItem("user");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.reload();
  };

  return (
    <>
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
        <NavButton
          title="menu"
          customFunc={() => setActiveMenu(!activeMenu)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        {access_token ? (
          <div className="flex">
            <NavButton
              title="Notification"
              customFunc={() => handleClick("notification")}
              color={currentColor}
              icon={<RiNotification3Line />}
            />
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              {user?.profile ? (
                <img
                  title="profile"
                  className="rounded-full w-8 h-8"
                  src={`${import.meta.env.VITE_API_URL}/${user?.profile}`}
                  alt=""
                />
              ) : (
                <p className="rounded-full w-8 h-8 flex items-center border-1 justify-center bg-blue-300">
                  {user.name[0]}
                </p>
              )}
              <p>
                <span className="text-gray-400 text-bold ml-1 text-14">
                  {user.name}
                </span>
              </p>
              <p
                className="text-gray-400 text-bold ml-1 text-14"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <Link to="login" className="mt-1">
            Login
          </Link>
        )}
      </div>
    </>
  );
};
