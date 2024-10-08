import { FileUploader } from "react-drag-drop-files";
import "./styleForm.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Common";
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
  const [routesList, setRoutesList] = useState([]);
  const api = `${import.meta.env.VITE_API_URL}/college/all-employee/`;
  const [loading, setLoading] = useState(false);
  const [SaveLoading, setSaveLoading] = useState(false);

  const [collegeFormData, setCollegeFormData] = useState({
    name: "", // Empty string as default
    // monthly_payment: "",
    delivery_time: "",
    schedule: "",
    campus_employee: [],
    route_uid: "",
  });

  const FetchEmployeeList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api);
      setEmployeeList(response?.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchEmployeeList();
  }, []);

  const FetchRoutesList = async () => {
    const api = `${import.meta.env.VITE_API_URL}/college/routes/`;

    setLoading(true);
    try {
      const response = await axios.get(api);
      setRoutesList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchRoutesList();
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
    const postapi = `${import.meta.env.VITE_API_URL}/college/college/`;
    try {
      const res = await axios.post(postapi, collegeFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        window.location.href = `/college`;
      }
    } catch (error) {
      console.error("Error while creating the college:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
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
              required // Built-in validation
            />
          </div>
          {/* <div className="campus-input-card">
            <label>Monthly Payment:</label>
            <input
              type="number"
              placeholder="Monthly Payment"
              name="monthly_payment"
              value={collegeFormData.monthly_payment}
              onChange={handleChange}
              required // Built-in validation
            />
          </div> */}
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
              required // Built-in validation
            />
          </div>
          <div className="campus-input-card">
            <label>Schedule:</label>
            <select
              name="schedule"
              value={collegeFormData.schedule}
              onChange={handleChange}
              className="CollegeEmployee"
              required // Built-in validation
            >
              <option value="">Select Schedule Time</option>
              {[1, 2, 3, 4, 5, 6, 7]?.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="campus-input-container">
          <div className="campus-input-card multipleSelector">
            <label>Campus Employee:</label>
            <select
              name="campus_employee"
              multiple
              value={collegeFormData.campus_employee}
              onChange={handleChange}
              className="CollegeEmployee"
              required // Built-in validation
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
          <div className="campus-input-card">
            <label>Route Name:</label>
            <select
              name="route_uid"
              value={collegeFormData.route_uid}
              onChange={handleChange}
              className="CollegeEmployee"
              required // Built-in validation
            >
              <option value="">Select Route</option>
              {routesList?.map((e) => (
                <option key={e.uid} value={e.uid}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="campusSubmitButton">
          <Link to="/college" className="subButton1 SubButton">
            Cancel
          </Link>
          <button className="subButton3" type="submit" disabled={SaveLoading}>
            {SaveLoading ? "Saving" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export const CollegeForm = () => {
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
