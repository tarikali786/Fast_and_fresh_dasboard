import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import { get, patch, remove } from "../../hooks/api"; // Assuming patch is your API method for updating
import { formatDate } from "../../utils";

export const StudentDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const [editedFields, setEditedFields] = useState({}); // State for edited fields
  const api = `${import.meta.env.VITE_API_URL}/college/student/${id}/`;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await get(api);
      setStudentDetails(response?.data);
      setEditedFields({
        name: response?.data?.name || "",
        // email: response?.data?.email || "",
        // mobile: response?.data?.mobile || "",
        // dob: response?.data?.dob || "",
        branch: response?.data?.branch || "",
        tag_number: response?.data?.tag_number || "",
        // year: response?.data?.year || "",
        isActive: response?.data?.isActive || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching student details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStudentDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await patch(api, editedFields);
      if (response.status === 200) {
        alert("Student details updated successfully!");
        fetchStudentDetails(); // Refetch details to get updated data
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      alert("Failed to update student details.");
    }
  };

  const handleStudentDelete = async () => {
    const deleteApi = `${import.meta.env.VITE_API_URL}/college/student/${id}/`;

    const confirmation = window.confirm(
      "Are you sure you want to delete this Student?"
    );

    if (confirmation) {
      await remove(deleteApi);
      navigate("/college");
    } else {
      console.log("Student deletion canceled");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
      <div>
        <button onClick={goBack} className="previousArrow">
          &#8592;
        </button>
      </div>
      <h1 className="Collegeheading">Student Details</h1>
      <p>{studentDetails?.uid}</p>
      <form onSubmit={handleUpdate}>
        {/* Form fields */}
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Student Name:</label>
            <input
              type="text"
              placeholder="Student Name"
              name="name"
              value={editedFields.name} // Use the edited value
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <div className="college-input-card">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={editedFields.email} // Use the edited value
              onChange={handleInputChange}
              required
            />
          </div> */}
        </div>
        {/* <div className="college-input-container">
          <div className="college-input-card">
            <label>Mobile:</label>
            <input
              type="number"
              placeholder="Mobile"
              name="mobile"
              value={editedFields.mobile} // Use the edited value
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="college-input-card">
            <label>DOB:</label>
            <input
              type="date"
              name="dob"
              value={editedFields.dob} // Use the edited value
              onChange={handleInputChange}
              required
            />
          </div>
        </div> */}
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Branch:</label>
            <input
              type="text"
              placeholder="Branch"
              name="branch"
              value={editedFields.branch} // Use the edited value
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="college-input-card">
            <label>Tag Number:</label>
            <input
              type="number"
              placeholder="Tag Number"
              name="tag_number"
              value={editedFields.tag_number} // Use the edited value
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {/* <div className="college-input-container">
          <div className="college-input-card">
            <label>Year:</label>
            <input
              type="year"
              placeholder="Year"
              name="year"
              value={editedFields.year} // Use the edited value
              onChange={handleInputChange}
              required
            />
          </div>
        </div> */}
        <div className="college-input-container">
          <div className="campus-input-card">
            <label>IsActive:</label>
            <select
              name="isActive"
              value={editedFields.isActive ? "true" : "false"}
              onChange={(e) =>
                setEditedFields((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true", // Convert string to boolean
                }))
              }
              className="CollegeEmployee"
              required
            >
              <option value="true">True</option>
              <option value="false">False</option>
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
                studentDetails?.created_at
                  ? formatDate(studentDetails.created_at)
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
                studentDetails?.updated_at
                  ? formatDate(studentDetails.updated_at)
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
            onClick={handleStudentDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
