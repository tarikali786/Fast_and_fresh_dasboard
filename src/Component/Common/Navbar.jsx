import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../../data/avatar.jpg";
import { useStateContext } from "../../contexts/contextProvider";

import { useEffect } from "react";

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
  return (
    <>
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
        <NavButton
          title="menu"
          customFunc={() => setActiveMenu(!activeMenu)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />

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
            <img
              title="profile"
              className="rounded-full w-8 h-8"
              src={avatar}
              alt=""
            />
            <p>
              <span className="text-gray-400 text-bold ml-1 text-14">Admin</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </div>
      </div>
    </>
  );
};
