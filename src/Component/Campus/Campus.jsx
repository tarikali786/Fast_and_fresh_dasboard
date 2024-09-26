import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../Common/Header";
import { CampusTable } from "./CampusTable";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./style.css";
import { Loading } from "../Common";
import { get, patch, remove } from "../../hooks/api";
import { fetchEmployeTypeList, formatDate } from "../../utils";

export const Campus = () => {
  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Tag Name",
        selector: (row) => row.tag_name,
        sortable: true,
      },
      {
        name: "Max student",
        selector: (row) => row.max_student_count,
        sortable: true,
      },
      {
        name: "Status",
        sortable: true,
        selector: (row) => row.isActive,
        cell: (row) => {
          let bgColorClass = "";
          switch (row.isActive) {
            case false:
              bgColorClass = "bg-orange-500";
              break;
            case true:
              bgColorClass = "bg-sky-400";
              break;
            default:
              bgColorClass = "bg-gray-950";
          }

          return (
            <span
              className={`border-1 w-20 flex justify-center py-2.5 text-white rounded-full ${bgColorClass}`}
            >
              {row.isActive ? "Active" : "InActive"}
            </span>
          );
        },
      },
    ];
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [campusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [routesList, setRoutesList] = useState([]);

  const [formState, setFormState] = useState({
    name: "",
    schedule: "",
    monthly_payment: "",
    delivery_time: "",
    campus_employee: [],
    route_uid: "",
  });

  const api = `${
    import.meta.env.VITE_API_URL
  }/dashboard/college-details/${id}/`;

  const fetchCollegeDetails = async () => {
    setLoading(true);
    const response = await get(api);
    const collegeData = response?.data?.data;
    setCollegeDetails(collegeData);
    setCampusList(response?.data?.campus_data);

    // Prepopulate form fields
    setFormState({
      name: collegeData?.name,
      schedule: collegeData?.schedule,
      monthly_payment: collegeData?.monthly_payment,
      delivery_time: collegeData?.delivery_time,
      campus_employee: collegeData?.campus_employee?.map((emp) => emp.uid),
      route_uid: collegeData?.routes?.uid,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchCollegeDetails();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployeTypeList("Campus_Employee");
      setEmployeeList(data);
    };
    fetchData();
  }, []);

  const FetchRoutesList = async () => {
    const api = `${import.meta.env.VITE_API_URL}/college/routes/`;

    setLoading(true);
    const response = await get(api);
    setRoutesList(response.data);
    setLoading(false);
  };

  useEffect(() => {
    FetchRoutesList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployees = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormState({
      ...formState,
      campus_employee: selectedEmployees,
    });
  };

  const handleSubmit = async (e) => {
    const api = `${import.meta.env.VITE_API_URL}/college/college/${id}/`;
    e.preventDefault();
    await patch(api, {
      ...formState,
      campus_employee: formState.campus_employee,
    });
    alert("College updated successfully!");
  };

  const goBack = () => {
    navigate(-1); // Go to the previous page in the browser history
  };

  const goForward = () => {
    navigate(1);
  };
  // Delete employee
  const handleCollegeDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this College?"
    );
    const api = `${import.meta.env.VITE_API_URL}/college/college/${id}/`;

    if (confirmation) {
      await remove(api);
      navigate("/college");
    } else {
      console.log("College deletion canceled");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
        <div>
          <button onClick={goBack} className="previousArrow">
            &#8592;
          </button>

          <button onClick={goForward} className="previousArrow">
            &#8594;
          </button>
        </div>
        <h1 className="COllegeheading">College Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>College Name:</label>
              <input
                type="text"
                placeholder="Campus Name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Schedule:</label>
              <select
                name="schedule"
                value={formState?.schedule}
                onChange={handleInputChange}
                className="CollegeEmployee"
                required // Built-in validation
              >
                <option value="" disabled>
                  Select Schedule Time
                </option>
                {[1, 2, 3, 4, 5, 6, 7]?.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>Monthly Payment:</label>
              <input
                type="text"
                placeholder="Monthly Payment"
                name="monthly_payment"
                value={formState.monthly_payment}
                onChange={handleInputChange}
              />
            </div>
            <div className="college-input-card">
              <label>Delivery Time:</label>
              <input
                type="time"
                name="delivery_time"
                value={formState.delivery_time}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="college-input-container">
            <div className="college-input-card1 multipleSelector">
              <label>Campus Employee:</label>
              <select
                name="campus_employee"
                multiple
                value={formState.campus_employee}
                onChange={handleEmployeeChange}
                className="CollegeEmployee"
              >
                {employeeList.map((emp) => (
                  <option key={emp.uid} value={emp.uid}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="campus-input-card">
              <label>Route:</label>

              <select
                name="route_uid"
                value={formState?.route_uid}
                onChange={handleInputChange}
                className="CollegeEmployee"
                required // Built-in validation
              >
                <option value="" disabled>
                  Select Route
                </option>
                {routesList?.map((e) => (
                  <option key={e.uid} value={e.uid}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="college-input-container">
            <div className="college-input-card">
              <label>Created At:</label>
              <input
                type="text"
                name="created_at"
                value={
                  collegeDetails?.created_at
                    ? formatDate(collegeDetails.created_at)
                    : ""
                }
                readOnly
              />
            </div>
            <div className="college-input-card">
              <label>Updated At:</label>
              <input
                type="text"
                name="updated_at"
                value={
                  collegeDetails?.updated_at
                    ? formatDate(collegeDetails.updated_at)
                    : ""
                }
                readOnly
              />
            </div>
          </div>

          <div className="campusSubmitButton">
            <button type="submit" className="subButton2">
              Update
            </button>
            <button
              type="button"
              className="subButton1"
              onClick={handleCollegeDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>

      <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
        <Header
          title="Campus"
          buttonName="Add Campus"
          Buttonlink={`/add-campus/${id}`}
          itmeList={campusList}
          setItemList={setCampusList}
        />
        <CampusTable
          columns={Columns}
          data={campusList}
          tabletype="CampusList"
        />
      </div>
    </>
  );
};
