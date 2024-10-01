import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { get, patch, remove } from "../../hooks/api";

export const RouteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [routeDetail, setRouteDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [updateRoute, setUpdateRoute] = useState({
    name: "",
    employee_uid: "",
    isActive: "",
  });

  const api = `${import.meta.env.VITE_API_URL}/college/routes/${id}/`;

  const fetchRouteDetail = async () => {
    setLoading(true);
    const response = await get(api);
    const { name, employee, isActive } = response.data;
    setRouteDetails(response.data);
    setUpdateRoute({
      name: name || "",
      employee_uid: employee?.uid || "",
      isActive: isActive || "",
    });
    setLoading(false);
  };

  const fetchEmployeeList = async () => {
    try {
      const employeeApi = `${
        import.meta.env.VITE_API_URL
      }/college/all-employee/?q=Driver`;
      const response = await get(employeeApi);
      if (response?.data?.data) {
        setEmployeeList(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch employee list", error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
    fetchRouteDetail();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (confirmation) {
      try {
        await remove(api);
        navigate("/routes");
      } catch (error) {
        console.error("Failed to delete route", error);
      }
    } else {
      console.log("Route deletion canceled");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await patch(api, updateRoute);
      if (response.status === 200) {
        alert("Route updated successfully!");
      } else {
        alert("Failed to update route.");
      }
    } catch (error) {
      console.error("Failed to update route", error);
      alert("Error while updating route.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUpdateRoute({
      ...updateRoute,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
      <div>
        <button onClick={goBack} className="previousArrow">
          &#8592;
        </button>
      </div>
      <h1 className="CollegeHeading">Route Details</h1>
      <p>{routeDetail?.uid}</p>

      <form onSubmit={handleUpdate}>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Route Name"
              name="name"
              value={updateRoute.name}
              onChange={handleChange}
            />
          </div>

          <div className="campus-input-card">
            <label>Route Employee:</label>
            <select
              name="employee_uid"
              className="CollegeEmployee"
              value={updateRoute.employee_uid}
              onChange={handleChange}
            >
              <option value="">Select Employee</option>
              {employeeList?.map((employee) => (
                <option key={employee.uid} value={employee.uid}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="college-input-container">
          <div className="campus-input-card">
            <label>IsAcitve:</label>
            <select
              name="isActive"
              value={updateRoute.isActive ? "true" : "false"}
              onChange={(e) =>
                setUpdateRoute((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true", // Convert string to boolean
                }))
              }
              className="CollegeEmployee"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <div className="campusSubmitButton">
          <button className="subButton2" type="submit">
            Update
          </button>
          <button className="subButton1" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
