import { useMediaQuery } from "react-responsive";
// import { Stacked, Button, SparkLine } from "../components";
import { Stacked } from "./Stacked";
import { Button } from "../Common/Button";
import { SparkLine } from "../Common/SparkLine";
import { earningData } from "../../data/dummy";
import { useStateContext } from "../../contexts/contextProvider";
export const Dashboard = () => {
  const { currentColor } = useStateContext();
  const isMd = useMediaQuery({ query: "(max-width: 968px)" });
  return (
    <div className="m-12 ">
      <div className="flex flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full  p-8 pt-9 mt-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-blod text-gray-400">Earnings</p>
              <p className="text-2xl">$23,70,3,333</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div>
        </div>
      </div>
      {/* className="flex justify-center m-3 flex-wrap gap-2 items-center" */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMd ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap: "2rem",
          marginBlock: "2rem",
        }}
      >
        {earningData.map((item) => (
          <div
            key={item.title}
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl"
          >
            <button
              type="button"
              className="text-2xl  rounded-full opacity-0.9 p-4 hover:drop-shadow-xl  "
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
            >
              {item.icon}
            </button>
            <p className="mt-3 ">
              <span className="text-lg font-semibold">{item.amount}</span>
              <span className={`text-sm text-${item.pcColor} ml-2`}>
                {item.percentage}
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-1">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mt-3 p-4 rounded-2xl w-full  ">
          <div className="flex justify-between ">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>. {/* <GoPrimitiveDot /> */}</span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>.{/* <GoPrimitiveDot /> */}</span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          {/* mt-10 flex gap-10 flex-wrap justify-center w-1/2 */}
          <div
            className=""
            style={{
              display: "grid",
              gridTemplateColumns: isMd ? "repeat(1,1fr)" : "repeat(2,1fr)",
              gap: "2rem",
              marginBlock: "2rem",
            }}
          >
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p className="">
                  <span className="text-3xl font-semibold">$93,342</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="">
                <p className="mt-8">
                  <span className="text-3xl font-semibold">$43,342</span>
                </p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>
              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line"
                  type="Line"
                  height="115"
                  width="100%"
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>

            <div>
              <div>
                <p className="">
                  <span className="text-3xl font-semibold">$93,342</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="" style={{ marginBottom: "2rem" }}>
                <p className="mt-8">
                  <span className="text-3xl font-semibold">$43,342</span>
                </p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>
              <Stacked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
