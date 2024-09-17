import { FiSettings } from "react-icons/fi";
import { Navbar } from "./Component/Common/Navbar";
import { Sidebar } from "./Component/Common/Sidebar";
import { ThemeSettings } from "./Component/Common/ThemeSettings";
import { useStateContext } from "./contexts/contextProvider";
import { Routes, Route } from "react-router-dom";
import { Campus } from "./Component/Campus/Campus";
import { Dashboard } from "./Component/Dashboard/DashBoard";
import { CampusStudent } from "./Component/Campus/CampusStudent";
import StudentDetails from "./Component/Campus/StudentDetails";
import EmployeeDetails from "./Component/Employee/EmployeeDetails";
import { Employees } from "./Component/Employee/Employees";
import { Vehicle } from "./Component/Vehicle/Vehicle";
import VehicleDetails from "./Component/Vehicle/VehicleDetails";
import Analytic from "./Component/Analytic/Analytic";
import CampusForm from "./Component/Forms/CampusForm";
import EmployeeForm from "./Component/Forms/EmployeeForm";
import VehicleForm from "./Component/Forms/VehicleForm";
import { College } from "./Component/Campus/College";
import CollegeForm from "./Component/Forms/CollegeForm";
import StudentForm from "./Component/Forms/StudentForm";
import FacultyForm from "./Component/Forms/FacultyForm";
import { Collection } from "./Component/Collection/Collection";
import CollectionForm from "./Component/Forms/CollectionForm";
import CollectionDetails from "./Component/Collection/CollectionDetails";
import { CollectionTable2 } from "./Component/Collection/CollectionTable2";
import { useState } from "react";

const App = () => {
  const {
    activeMenu,
    currentColor,
    currentMode,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [tableData, setTableData] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          {/* <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: "50%" }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button> */}
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div
            className="fixed md:static
            
            
            bg-main-bg dark:bg-main-dark-bg navbar w-full "
          >
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Campus Component */}

              <Route path="/college" element={<College />} />
              <Route path="/add-college" element={<CollegeForm />} />

              <Route path="/campus/:id" element={<Campus />} />
              <Route
                path="/campus-student-list/:id"
                element={<CampusStudent />}
              />
              <Route
                path="/campus-student-details/:id"
                element={<StudentDetails />}
              />

              <Route path="/add-campus/:id" element={<CampusForm />} />
              <Route path="/add-student/:id" element={<StudentForm />} />
              <Route path="/add-faculty/:id" element={<FacultyForm />} />

              {/* End Campus Component */}

              {/* Employee Component */}
              <Route path="/employees" element={<Employees />} />
              <Route
                path="/employee-details/:id"
                element={<EmployeeDetails />}
              />
              <Route path="/add-employee" element={<EmployeeForm />} />

              {/* End Employee Component */}

              {/* Analytic Component */}
              <Route path="/analytics" element={<Analytic />} />

              {/* end Analytic Component */}

              {/* Employee Component */}
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/add-collection" element={<CollectionForm />} />
              <Route path="/collection" element={<Collection />} />
              <Route
                path="/collection-details"
                element={
                  <CollectionTable2 data={tableData} columns={tableColumn} />
                }
              />
              <Route
                path="/collection-details/:id"
                element={
                  <CollectionDetails
                    setTableData={setTableData}
                    setTableColumn={setTableColumn}
                  />
                }
              />

              <Route path="/vehicle-details/:id" element={<VehicleDetails />} />
              <Route path="/add-vehicle" element={<VehicleForm />} />

              {/* End Employee Component */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
