import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import { get, patch, remove } from "../../hooks/api"; // Assuming patch is your API method for updating
import { formatDate } from "../../utils";

export const FacultyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [editedFields, setEditedFields] = useState({ name: "" }); // Initialize with an empty name
  const api = `${import.meta.env.VITE_API_URL}/college/faculty/${id}/`;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const fetchFacultyDetails = async () => {
    try {
      const response = await get(api);
      setFacultyDetails(response?.data);
      setEditedFields({ name: response?.data.name }); // Initialize editedFields with the fetched name
      setLoading(false);
    } catch (error) {
      console.error("Error fetching faculty details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyDetails();
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
        alert("Faculty details updated successfully!");
        fetchFacultyDetails(); // Refetch details after update
      }
    } catch (error) {
      console.error("Error updating faculty details:", error);
      alert("Failed to update faculty details.");
    }
  };

  // Delete employee
  const handleFacultyDelete = async () => {
    const deleteApi = `${import.meta.env.VITE_API_URL}/college/faculty/${id}/`;

    const confirmation = window.confirm(
      "Are you sure you want to delete this Faculty?"
    );

    if (confirmation) {
      await remove(deleteApi);
      navigate("/college");
    } else {
      console.log("Faculty deletion canceled");
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
      <h1 className="Collegeheading">Faculty Details</h1>
      <p>{facultyDetails?.uid}</p>
      <form onSubmit={handleUpdate}>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Faculty Name:</label>
            <input
              type="text"
              placeholder="Faculty Name"
              name="name"
              value={editedFields.name} // Use the edited value
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Created At:</label>
            <input
              type="text"
              placeholder="Created At"
              name="created_at"
              value={
                facultyDetails?.created_at
                  ? formatDate(facultyDetails.created_at)
                  : ""
              }
              readOnly
            />
          </div>
          <div className="college-input-card">
            <label>Updated At:</label>
            <input
              type="text"
              placeholder="Updated At"
              name="updated_at"
              value={
                facultyDetails?.updated_at
                  ? formatDate(facultyDetails.updated_at)
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
            onClick={handleFacultyDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
