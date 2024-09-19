import { FileUploader } from "react-drag-drop-files";
import "./styleForm.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Common/Loading";
import axios from "axios";

const fileTypes = ["csv type file"];
const MultipleForm = () => {
  const [files, setFiles] = useState([]);

  const handleChange = (selectedFiles) => {
    const fileArray = Array.isArray(selectedFiles)
      ? selectedFiles
      : Array.from(selectedFiles);
    setFiles(fileArray);
  };
  return (
    <>
      <div className="campusMultipleContainer Mainsection">
        <h1>Drag & Drop Files</h1>
        <div className="fileUploaderCard">
          <FileUploader
            multiple={false}
            handleChange={handleChange}
            name="files"
            types={fileTypes}
          />
          <div className="uploadedFileCard">
            {files.length > 0
              ? files.map((f, index) => (
                  <p key={index}>{`File name: ${f.name}`}</p>
                ))
              : "No files uploaded yet"}
          </div>
          <div className="campusSubmitButton">
            <Link to={"/campus"} className="subButton1 SubButton">
              Cancel
            </Link>
            <button className="subButton3">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

const SingleForm = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const api = `${import.meta.env.VITE_API_URL}/college/all-employee/`;
  const [loading, setLoading] = useState(false);
  const [SaveLoading, setSaveLoading] = useState(false);
  const [collegeFormData, setCollegeFormData] = useState({
    name: "",
    monthly_payment: "",
    delivery_time: "",
    schedule: "",
    campus_employee: [],
    routes: {
      name: "",
      employee_uid: "",
    },
  });

  const FetchEmployeeList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api);
      setEmployeeList(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchEmployeeList();
  }, []);

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "campus_employee") {
      const selectedEmployees = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setCollegeFormData((prevState) => ({
        ...prevState,
        campus_employee: selectedEmployees,
      }));
    } else if (name === "route_name" || name === "employee_uid") {
      setCollegeFormData((prevState) => ({
        ...prevState,
        routes: {
          ...prevState.routes,
          [name === "route_name" ? "name" : "employee_uid"]: value,
        },
      }));
    } else {
      setCollegeFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaveLoading(true);
    const postapi = `${import.meta.env.VITE_API_URL}/dashboard/college/`;
    try {
      const res = await axios.post(postapi, collegeFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error while creating the college:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="Mainsection">
        <h1>Add College</h1>
        <form onSubmit={handleSubmit}>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>College Name:</label>
              <input
                type="text"
                placeholder="College Name"
                name="name"
                value={collegeFormData.name}
                onChange={handleChange}
                spellCheck
              />
            </div>
            <div className="campus-input-card">
              <label>Monthly Payment:</label>
              <input
                type="number"
                placeholder="Monthly Payment"
                name="monthly_payment"
                value={collegeFormData.monthly_payment}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Delivery Time:</label>
              <input
                type="time"
                placeholder="Delivery Time"
                name="delivery_time"
                value={collegeFormData.delivery_time}
                onChange={handleChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Schedule:</label>
              <input
                type="number"
                placeholder="Schedule"
                name="schedule"
                value={collegeFormData.schedule}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="campus-input-container">
            <div className="campus-input-card multipleSelector ">
              <label>Campus Employee:</label>
              <select
                name="campus_employee"
                multiple
                value={collegeFormData.campus_employee}
                onChange={handleChange}
                className="CollegeEmployee"
              >
                {employeeList?.map(
                  (e) =>
                    e.employee_type === "Campus_Employee" && (
                      <option key={e.uid} value={e.uid}>
                        {e.name}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Route Name:</label>
              <input
                type="text"
                placeholder="Route Name"
                name="route_name"
                value={collegeFormData.routes.name}
                onChange={handleChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Route Employee:</label>
              <select
                name="employee_uid"
                value={collegeFormData.routes.employee_uid}
                onChange={handleChange}
                className="CollegeEmployee"
              >
                {employeeList?.map(
                  (e) => (
                    // e.employee_type === "Driver" && (
                    <option key={e.uid} value={e.uid}>
                      {e.name}
                    </option>
                  )
                  // )
                )}
              </select>
            </div>
          </div>
        </form>
        <div className="campusSubmitButton">
          <Link to="/college" className="subButton1 SubButton">
            Cancel
          </Link>
          <button className="subButton3" onClick={handleSubmit}>
            {SaveLoading ? "Saving" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

const CollegeForm = () => {
  const [formType, setFormType] = useState("");

  return (
    <>
      {formType === "" && (
        <div className="campusInputContainer Mainsection">
          <h1>Please select a Campus Submission Type</h1>
          <div className="campusSubmissionButton">
            <button
              onClick={() => setFormType("single")}
              className="subButton2"
            >
              Single
            </button>
            <button
              onClick={() => setFormType("multiple")}
              className="subButton3"
            >
              Multiple / CSV File
            </button>
          </div>
        </div>
      )}

      {formType === "single" && <SingleForm />}

      {formType === "multiple" && <MultipleForm />}
    </>
  );
};

export default CollegeForm;
