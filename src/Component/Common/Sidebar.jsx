import { NavLink, Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../contexts/contextProvider";
import { FaSchoolFlag } from "react-icons/fa6";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoMdContacts } from "react-icons/io";
import { GiClothesline } from "react-icons/gi";
import { FaCarAlt } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import Logo from "../../data/Logo.png";
export const Sidebar = () => {
  const { activeMenu, setActiveMenu, currentColor, screenSize } =
    useStateContext();
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const pathname = window.location.pathname;

  return (
    <div
      style={{ background: "#f2f2f2" }}
      className=" h-screen  md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 z-50  "
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex 
              text-xl font-extrabold tracking-tight dark:text-white text-slate-900
            "
            >
              <div style={{ width: "80px", height: "80px" }}>
                <img
                  src={Logo}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <span>Fast & Fresh</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4  block md:hidden "
            >
              <MdOutlineCancel />
            </button>
          </div>

          <div className="mt-10">
            <>
              <p className="text-gray-500 m-3 mt-4 uppercase p-2">Dashboard</p>
              <NavLink
                to="Dashboard"
                key="Dashboard"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <TbLayoutDashboard />
                <p>
                  <span className="capitalize">Dashboard</span>
                </p>
              </NavLink>

              <NavLink
                to="Collection"
                key="Collection"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <MdCollectionsBookmark />
                <p>
                  <span className="capitalize">Collection</span>
                </p>
              </NavLink>
            </>
            <p className="text-gray-500 m-3 mt-4 uppercase p-2">Pages</p>

            <>
              <NavLink
                to="College"
                key="College"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaSchoolFlag />
                <p>
                  <span className="capitalize">Colleges</span>
                </p>
              </NavLink>
            </>
            <>
              <NavLink
                to="employees"
                key="employees"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <IoMdContacts />
                <p>
                  <span className="capitalize">employees</span>
                </p>
              </NavLink>
            </>
            <>
              <NavLink
                to="vehicle"
                key="vehicle"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaCarAlt />
                <p>
                  <span className="capitalize">vehicles</span>
                </p>
              </NavLink>
            </>
            <>
              <NavLink
                to="routes"
                key="routes"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaRoute />
                <p>
                  <span className="capitalize">Routes</span>
                </p>
              </NavLink>
            </>
            <>
              <NavLink
                to="dry-area"
                key="dry-area"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <GiClothesline />
                <p>
                  <span className="capitalize">Dry Area</span>
                </p>
              </NavLink>
            </>
          </div>
        </>
      )}
    </div>
  );
};
