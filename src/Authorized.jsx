import { useStateContext } from "./contexts/contextProvider";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  Analytic,
  Campus,
  CampusStudent,
  Collection,
  CollectionDetails,
  CollectionTable2,
  College,
  Dashboard,
  DryArea,
  DryAreaDetails,
  EmployeeDetails,
  Employees,
  FacultyDetails,
  Navbar,
  Sidebar,
  StudentDetails,
  ThemeSettings,
  Vehicle,
  VehicleDetails,
} from "./Component";
import {
  CampusForm,
  CollectionForm,
  CollegeForm,
  DryAreaForm,
  EmployeeForm,
  FacultyForm,
  RouteForm,
  StudentForm,
  VehicleForm,
} from "./Component/Forms";
import { RouteDetails, RouteList } from "./Component/Routes";

const Authorized = () => {
  const { activeMenu, currentMode, themeSettings } = useStateContext();

  const [tableData, setTableData] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
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
              <Route
                path="/campus-faculty-details/:id"
                element={<FacultyDetails />}
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

              <Route path="/routes" element={<RouteList />} />
              <Route path="/add-route" element={<RouteForm />} />
              <Route path="/route-details/:id" element={<RouteDetails />} />

              <Route path="/dry-area" element={<DryArea />} />
              <Route path="/dryArea-details/:id" element={<DryAreaDetails />} />
              <Route path="/add-dryArea" element={<DryAreaForm />} />

              {/* End Employee Component */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorized;
