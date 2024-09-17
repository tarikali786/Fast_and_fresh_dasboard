import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Common/Loading";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = `${
    import.meta.env.VITE_API_URL
  }/dashboard/employee-details/${id}/`;
  const FetchemployeeDetails = async () => {
    try {
      const response = await axios.get(api);
      if (response.status == 200) {
        setEmployeeDetails(response?.data?.data);
        console.log(response.data);

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    FetchemployeeDetails();
  }, []);
  const goBack = () => {
    navigate(-1);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes}${ampm}`;

    return `${day}-${month}-${year} T ${formattedTime}`;
  };
  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <div>
        <button onClick={goBack} className="previousArrow">
          &#8592;
        </button>
      </div>
      <h1 className="COllegeheading">college Details</h1>
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
        <button className="subButton2">Update</button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
