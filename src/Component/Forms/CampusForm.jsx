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
  const [error, setError] = useState(false);
  const [campusFormData, setCampusFormData] = useState({
    name: "",
    tag_name: "",
    max_student_count: "",
    color: "#000000",
    uniform: false,
    college_uid: id,
  });

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampusFormData({
      ...campusFormData,
      [name]: value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is valid using the HTML5 validation API
    if (!e.target.checkValidity()) {
      e.target.reportValidity(); // Will trigger the built-in browser validation alerts
      return;
    }

    setLoading(true);
    const postapi = `${import.meta.env.VITE_API_URL}/college/campus/`;
    try {
      const res = await axios.post(postapi, campusFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        setCampusFormData({
          name: "",
          tag_name: "",
          max_student_count: "",
          color: "#000000",
          uniform: true,
          college_uid: id,
        });
        window.location.href = `/campus/${id}`;
      }
    } catch (error) {
      setError(true);
      console.error("Error while creating the campus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Error text="Something went wrong!" setError={setError} />}

      <div className="Mainsection">
        <h1>Add Campus</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Campus Name:</label>
              <input
                type="text"
                placeholder="Campus Name"
                name="name"
                value={campusFormData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campus-input-card">
              <label>Tag Name:</label>
              <input
                type="text"
                placeholder="Tag Name"
                name="tag_name"
                value={campusFormData.tag_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Maximum Student Count:</label>
              <input
                type="number"
                placeholder="Max Student Count"
                name="max_student_count"
                value={campusFormData.max_student_count}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            <div className="campus-input-card">
              <label>Color:</label>
              <input
                type="color"
                placeholder="Color"
                name="color"
                value={campusFormData.color}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Uniform:</label>
              <select
                name="uniform"
                className="CollegeEmployee"
                value={campusFormData.uniform}
                onChange={handleChange}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>

          <div className="campusSubmitButton">
            <Link to={`/campus/${id}`} className="subButton1 SubButton">
              Cancel
            </Link>
            <button className="subButton3" type="submit" disabled={Loading}>
              {Loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleForm;

export const CampusForm = () => {
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
