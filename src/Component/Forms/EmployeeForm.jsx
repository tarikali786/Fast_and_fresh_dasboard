import "./styleForm.css";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Link } from "react-router-dom";
import axios from "axios";
import { Error } from "../Common";

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
          <Link to="/campus" className="subButton1 SubButton">
            Cancel
          </Link>
          <button className="subButton3">Save</button>
        </div>
      </div>
    </div>
  );
};

const SingleForm = () => {
  const Employeetype = [
    { name: "Admin" },
    { name: "Campus_Employee" },
    { name: "Driver" },
    { name: "Washing" },
    { name: "Drying" },
    { name: "Segregation" },
  ];

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employee_type: "",
    aadhar_number: "",
    mobile: "",
    dob: "",
    salary: "",
    username: "",
  });

  useEffect(() => {
    if (formData.email) {
      setFormData((prev) => ({
        ...prev,
        username: formData.email,
      }));
    }
  }, [formData.email]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation logic

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out fields with empty values
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    try {
      const apiURL = `${import.meta.env.VITE_API_URL}/college/add-employee/`;
      const res = await axios.post(apiURL, filteredFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        window.location.href = "/employees";
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error?.response?.data?.error || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Error
          text={errorMsg ? errorMsg : "Something went wrong!"}
          setError={setError}
        />
      )}

      <div className="Mainsection">
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Employee Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="campus-input-card">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="campus-input-card">
              <label>Employee Type:</label>
              <select
                name="employee_type"
                value={formData.employee_type}
                onChange={handleInputChange}
                required
                className="CollegeEmployee"
              >
                <option value="">Select Employee Type</option>
                {Employeetype.map((e) => (
                  <option key={e.name} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Aadhar Number:</label>
              <input
                type="text"
                placeholder="Aadhar Number"
                name="aadhar_number"
                value={formData.aadhar_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Mobile:</label>
              <input
                type="text"
                placeholder="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>DOB:</label>
              <input
                type="date"
                placeholder="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Salary:</label>
              <input
                type="number"
                placeholder="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
              />
            </div>
          </div>

         
          <div className="campusSubmitButton">
            <Link to="/employees" className="subButton1 SubButton">
              Cancel
            </Link>
            <button type="submit" className="subButton3" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const EmployeeForm = () => {
  const [formType, setFormType] = useState("");

  return (
    <>
      {formType === "" && (
        <div className="campusInputContainer Mainsection">
          <h1>Please select a Employee Submission Type</h1>
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
