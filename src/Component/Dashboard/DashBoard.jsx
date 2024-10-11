import { useMediaQuery } from "react-responsive";

import { SparkLine } from "../Common/SparkLine";
import { FaSchoolFlag } from "react-icons/fa6";
import { GiFamilyHouse } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { IoMdContacts } from "react-icons/io";
import { FaCarAlt } from "react-icons/fa";

import { useStateContext } from "../../contexts/contextProvider";
import { useEffect, useState } from "react";
import { get } from "../../hooks/api";
import { Loading } from "../Common/Loading";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { currentColor } = useStateContext();
  const isMd = useMediaQuery({ query: "(max-width: 968px)" });
  const [analyticData, setAnalytic] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalyticDetails = async () => {
    setLoading(true);
    const api = `${import.meta.env.VITE_API_URL}/dashboard/analytic/`;
    const res = await get(api);
    setAnalytic(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchAnalyticDetails();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="m-12 ">
      <div className="flex flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full  p-8 pt-9 mt-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-blod text-gray-400">Total Earnings</p>
              <p className="text-2xl">₹{analyticData?.total_earnings} </p>
            </div>
          </div>
          {/* <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div> */}
        </div>
      </div>
      {/* className="flex justify-center m-3 flex-wrap gap-2 items-center" */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMd ? "repeat(2,1fr)" : "repeat(5,1fr)",
          gap: "2rem",
          marginBlock: "2rem",
        }}
      >
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl  rounded-full opacity-0.9 p-4 hover:drop-shadow-xl  "
            style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
          >
            <FaSchoolFlag />
          </button>
          <p className="mt-3 ">
            <span className="text-lg font-semibold">
              {analyticData?.total_colleges}
            </span>
            <p className="text-gray-500">Total Colleges</p>
          </p>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl  rounded-full opacity-0.9 p-4 hover:drop-shadow-xl  "
            style={{
              color: "rgb(255, 244, 229)",
              backgroundColor: "#a896df",
            }}
          >
            <GiFamilyHouse />
          </button>
          <p className="mt-3 ">
            <span className="text-lg font-semibold">
              {analyticData?.total_campus}
            </span>
            <p className="text-gray-500">Total Campus</p>
          </p>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl  rounded-full opacity-0.9 p-4 hover:drop-shadow-xl  "
            style={{
              color: "rgb(228, 118, 118)",
              backgroundColor: "rgb(255, 244, 229)",
            }}
          >
            <IoMdContacts />
          </button>
          <p className="mt-3 ">
            <span className="text-lg font-semibold">
              {analyticData?.total_Employee}
            </span>
            <p className="text-gray-500">Total Employees</p>
          </p>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl  rounded-full opacity-0.9 p-4 hover:drop-shadow-xl  "
            style={{
              color: "rgb(0, 194, 146)",
              backgroundColor: "rgb(235, 250, 242)",
            }}
          >
            <PiStudentFill />
          </button>
          <p className="mt-3 ">
            <span className="text-lg font-semibold">
              {analyticData?.total_student}
            </span>
            <p className="text-gray-500">Total Student</p>
          </p>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl  rounded-full opacity-0.9 p-4 hover:drop-shadow-xl  "
            style={{
              color: "#c12ebc",
              backgroundColor: "#a9e0d3",
            }}
          >
            <FaCarAlt />
          </button>
          <p className="mt-3 ">
            <span className="text-lg font-semibold">
              {analyticData?.total_Vehcile}
            </span>
            <p className="text-gray-500">Total Vehicle</p>
          </p>
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mt-3 p-4 rounded-2xl w-full  ">
          <div className="flex justify-between "></div>
          <div
            className=""
            style={{
              display: "grid",
              gridTemplateColumns: isMd ? "repeat(1,1fr)" : "repeat(1,1fr)",
              gap: "2rem",
              marginBlock: "2rem",
            }}
          >
            <div className="mt-5">
              <div>
                <p className="font-semibold text-xl mb-5">Monthly Earning</p>
              </div>

              <SparkLine
                currentColor={currentColor}
                id="line"
                type="Line"
                height="100"
                color={currentColor}
                data={analyticData?.monthly_earnings}
              />
            </div>

            <div className="mt-5">
              <div>
                <p className="font-semibold text-xl mb-5">College</p>
              </div>

              <SparkLine
                currentColor={currentColor}
                id="line"
                type="Line"
                height="100"
                color={currentColor}
                data={analyticData?.college}
              />
            </div>

            <div className="mt-5">
              <div>
                <p className="font-semibold text-xl mb-5">Campus</p>
              </div>

              <SparkLine
                currentColor={currentColor}
                id="line"
                type="Line"
                height="100"
                color={currentColor}
                data={analyticData?.campus}
              />
            </div>

            <div className="mt-5">
              <div>
                <p className="font-semibold text-xl mb-5">Student</p>
              </div>

              <SparkLine
                currentColor={currentColor}
                id="line"
                type="Line"
                height="100"
                color={currentColor}
                data={analyticData?.student}
              />
            </div>

            <div className="mt-5">
              <div>
                <Link to="/collection" className="font-semibold text-xl mb-5">
                  Collection & Delivery Update{" "}
                </Link>
              </div>

              <SparkLine
                currentColor={currentColor}
                id="line"
                type="Line"
                height="100"
                color={currentColor}
                data={analyticData?.collection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
