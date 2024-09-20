import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { get, remove } from "../../hooks/api";

export const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = `${
    import.meta.env.VITE_API_URL
  }/dashboard/employee-details/${id}/`;
  const FetchemployeeDetails = async () => {
    const response = await get(api);
    setEmployeeDetails(response?.data?.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    FetchemployeeDetails();
  }, []);
  const goBack = () => {
    navigate(-1);
  };

  const handleEmployeeDelete = async () => {
    const api = `${
      import.meta.env.VITE_API_URL
    }/college/employee-delete/${id}/`;
    const response = await remove(api);
    navigate("/employees");
  };

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <div>
        <button onClick={goBack} className="previousArrow">
          &#8592;
        </button>
      </div>
      <h1 className="COllegeheading">Employee Details</h1>
      <p>{employeeDetails?.uid}</p>
      <form>
        <div className="college-input-container">
          <div className="college-input-card">
            <label> Name:</label>
            <input
              type="text"
              placeholder="Campus Name"
              name="name"
              value={employeeDetails?.name}
            />
          </div>
          <div className="college-input-card">
            <label>Email:</label>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={employeeDetails?.email}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Mobile Number:</label>
            <input
              type="number"
              placeholder="Mobile Number"
              name="mobile"
              value={employeeDetails?.mobile}
            />
          </div>
          <div className="college-input-card">
            <label>Aadhar Number:</label>
            <input
              type="number"
              placeholder="Aadhar Number"
              name="aadhar_number"
              value={employeeDetails?.aadhar_number}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Employee Type:</label>
            <input
              type="text"
              placeholder="Employee type"
              name="employee_type"
              value={employeeDetails?.employee_type}
            />
          </div>
          <div className="college-input-card">
            <label>DOB:</label>
            <input
              type="date "
              placeholder="DOB"
              name="dob"
              value={employeeDetails?.dob}
            />
          </div>
        </div>
      </form>
      <div className="campusSubmitButton">
        {/* <button className="subButton2">Update</button> */}
        <button className="subButton1" onClick={handleEmployeeDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
