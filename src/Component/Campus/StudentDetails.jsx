import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { get } from "../../hooks/api";

export const StudentDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [StudentDetails, setStudentDetails] = useState(null);
  const api = `${import.meta.env.VITE_API_URL}/college/student/${id}/`;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go to the previous page in the browser history
  };

  const FetchStudentDetails = async () => {
    const response = await get(api);
    setStudentDetails(response?.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    FetchStudentDetails();
  }, []);
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
      <h1 className="COllegeheading">Student Details</h1>
      <p>{StudentDetails?.uid}</p>
      <form>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Student Name:</label>
            <input
              type="text"
              placeholder="Campus Name"
              name="name"
              value={StudentDetails?.name}
            />
          </div>
          <div className="college-input-card">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={StudentDetails?.email}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Mobile:</label>
            <input
              type="number"
              placeholder="Mobile"
              name="mobile"
              value={StudentDetails?.mobile}
            />
          </div>
          <div className="college-input-card">
            <label>DOB:</label>
            <input
              type="date"
              placeholder="Delivery Time"
              name="delivery_time"
              value={StudentDetails?.dob}
            />
          </div>
        </div>

        <div className="college-input-container">
          <div className="college-input-card">
            <label>Branch:</label>
            <input
              type="text"
              placeholder="Branch"
              name="branch"
              value={StudentDetails?.branch}
            />
          </div>
          <div className="college-input-card">
            <label>Tag Number:</label>
            <input
              type="number"
              placeholder="Tag Number"
              name="tag_number"
              value={StudentDetails?.tag_number}
            />
          </div>
        </div>

        <div className="college-input-container">
          <div className="college-input-card">
            <label>Year:</label>
            <input
              type="date"
              placeholder="Year"
              name="year"
              value={StudentDetails?.year}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Created At:</label>

            <input
              type="text"
              placeholder="updated_at"
              name="created_at"
              value={
                StudentDetails?.created_at
                  ? formatDate(StudentDetails.created_at)
                  : ""
              }
              readOnly
            />
          </div>
          <div className="college-input-card">
            <label>Updated At:</label>
            <input
              type="text"
              placeholder="updated_at"
              name="updated_at"
              value={
                StudentDetails?.updated_at
                  ? formatDate(StudentDetails.updated_at)
                  : ""
              }
              readOnly
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
