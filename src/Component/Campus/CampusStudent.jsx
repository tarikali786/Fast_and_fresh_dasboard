import { CampusTable } from "./CampusTable";
import { Header } from "../Common/Header";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../Common";
import { useEffect, useMemo, useState } from "react";
import "./style.css";
import { get, patch, remove } from "../../hooks/api"; // Assuming you have a patch method in your API hooks
import { formatDate } from "../../utils";

export const CampusStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [campusDetails, setCampusDetails] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true); // Default true to show loading at start
  const [editedFields, setEditedFields] = useState({});

  // Navigate Back and Forward
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  // API URLs
  const api = `${import.meta.env.VITE_API_URL}/dashboard/campus-details/${id}/`;

  // Fetch campus details and set state
  const FetchCampusDetails = async () => {
    setLoading(true); // Show loading while fetching
    try {
      const response = await get(api);
      const data = response?.data?.data;
      setCampusDetails(data);
      setStudentList(response?.data?.student_list);
      setFacultyList(response?.data?.faculty_list);

      // Initialize form fields for editing
      setEditedFields({
        name: data?.name || "",
        tag_name: data?.tag_name || "",
        max_student_count: data?.max_student_count || "",
        uniform: data?.uniform || "",
      });
    } catch (error) {
      console.error("Error fetching campus details:", error);
    }
    setLoading(false);
  };

  // Fetch data on component load
  useEffect(() => {
    FetchCampusDetails();
  }, [id]); // Re-fetch if id changes

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateApi = `${import.meta.env.VITE_API_URL}/college/campus/${id}/`;
    try {
      const response = await patch(updateApi, editedFields);
      if (response.status === 200) {
        alert("Campus details updated successfully!");
        FetchCampusDetails(); // Refetch details after update
      }
    } catch (error) {
      console.error("Error updating campus details:", error);
      alert("Failed to update campus details.");
    }
  };

  // Column configuration for tables
  const studentColumns = useMemo(
    () => [
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
        selector: (row) => `${campusDetails?.tag_name}${row.tag_number}`,
        sortable: true,
      },
      {
        name: "Branch",
        selector: (row) => row.branch,
        sortable: true,
      },
      {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
      },
      {
        name: "Mobile",
        selector: (row) => row.mobile,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.isActive,
        cell: (row) => {
          const bgColorClass = row.isActive ? "bg-sky-400" : "bg-orange-500";
          return (
            <span
              className={`border-1 w-20 flex justify-center py-2.5 text-white rounded-full ${bgColorClass}`}
            >
              {row.isActive ? "Active" : "Inactive"}
            </span>
          );
        },
        sortable: true,
      },
    ],
    [campusDetails]
  );

  const facultyColumns = useMemo(
    () => [
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
    ],
    []
  );

  // Delete employee
  const handleCampusDelete = async () => {
    const deleteApi = `${import.meta.env.VITE_API_URL}/college/campus/${id}/`;

    const confirmation = window.confirm(
      "Are you sure you want to delete this Campus?"
    );

    if (confirmation) {
      await remove(deleteApi);
      navigate(`/college/`);
    } else {
      console.log("Campus deletion canceled");
    }
  };

  // Loading State
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
        <h1 className="COllegeheading">Campus Details</h1>
        <p>{campusDetails?.uid}</p>

        {/* Campus Form */}
        <form onSubmit={handleUpdate}>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>Campus Name:</label>
              <input
                type="text"
                placeholder="Campus Name"
                name="name"
                value={editedFields?.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="college-input-card">
              <label>Tag Name:</label>
              <input
                type="text"
                placeholder="Tag Name"
                name="tag_name"
                value={editedFields?.tag_name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>Maximum Student:</label>
              <input
                type="number"
                placeholder="Maximum Student"
                name="max_student_count"
                value={editedFields?.max_student_count}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Uniform:</label>
              <select
                name="uniform"
                value={editedFields?.uniform ? "true" : "false"}
                onChange={handleInputChange}
                className="CollegeEmployee"
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
                value={
                  campusDetails?.created_at
                    ? formatDate(campusDetails.created_at)
                    : ""
                }
                readOnly
              />
            </div>
            <div className="college-input-card">
              <label>Updated At:</label>
              <input
                type="text"
                value={
                  campusDetails?.updated_at
                    ? formatDate(campusDetails.updated_at)
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
              onClick={handleCampusDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>

      {/* Student and Faculty Tables */}
      <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
        <Header
          title="Student List"
          buttonName="Add Student"
          Buttonlink={`/add-student/${id}`}
        />
        <CampusTable
          columns={studentColumns}
          data={studentList}
          tabletype="CampusStudentList"
        />
      </div>

      <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
        <Header
          title="Faculty List"
          buttonName="Add Faculty"
          Buttonlink={`/add-faculty/${id}`}
        />
        <CampusTable
          columns={facultyColumns}
          data={facultyList}
          tabletype="CampusFacultyList"
        />
      </div>
    </>
  );
};
