import "./styleForm.css";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./styleForm.css";

import { Link, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    name: "",
    // email: "",
    // mobile: "",
    tag_number: "",
    branch: "",
    // year: "",
    // dob: "",
    campus: id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filter out empty fields before sending the data
  const filterEmptyFields = (data) => {
    return Object.keys(data)
      .filter((key) => data[key] !== "")
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is valid using the HTML5 validation API
    if (!e.target.checkValidity()) {
      e.target.reportValidity(); // Show built-in validation alerts if invalid
      return;
    }

    setLoading(true);

    // Filter out empty fields from the form data
    const filteredData = filterEmptyFields(studentFormData);

    const postapi = `${import.meta.env.VITE_API_URL}/college/student/`;
    try {
      const res = await axios.post(postapi, filteredData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        setStudentFormData({
          name: "",
          // email: "",
          // mobile: "",
          tag_number: "",
          branch: "",
          // year: "",
          // dob: "",
          campus: id,
        });
        window.location.href = `/campus-student-list/${id}`;
      }
    } catch (error) {
      setError(true);
      console.error("Error while creating the Student:", error);
      if (error.response.data.email) {
        setErrorMessage(error.response.data.email[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Error text={errorMessage} setError={setError} />}

      <div className="Mainsection">
        <h1>Add Student</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Student Name:</label>
              <input
                type="text"
                placeholder="Student Name"
                name="name"
                value={studentFormData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="campus-input-card">
              <label>Tag Number:</label>
              <input
                type="text"
                placeholder="Tag Number"
                name="tag_number"
                value={studentFormData.tag_number}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {/* 
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Mobile:</label>
              <input
                type="number"
                placeholder="Mobile"
                name="mobile"
                value={studentFormData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={studentFormData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>DOB:</label>
              <input
                type="date"
                placeholder="DOB"
                name="dob"
                value={studentFormData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Year:</label>
              <input
                type="number"
                placeholder="Year"
                name="year"
                value={studentFormData.year}
                onChange={handleInputChange}
              />
            </div>
          </div> */}

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Branch:</label>
              <input
                type="text"
                placeholder="Branch"
                name="branch"
                value={studentFormData.branch}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="campusSubmitButton">
            <Link
              to={`/campus-student-list/${id}`}
              className="subButton1 SubButton"
            >
              Cancel
            </Link>
            <button className="subButton3" type="submit" disabled={Loading}>
              {Loading ? "Saving.." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleForm;

export const StudentForm = () => {
  const [formType, setFormType] = useState("single");

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
