import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./styleform.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Error from "../Common/Error";
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
  const [facultyFormData, setFacultyFormData] = useState({
    name: "",
    campus_uid: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyFormData({
      ...facultyFormData,
      [name]: value,
    });
  };

  const hanldleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postapi = `${import.meta.env.VITE_API_URL}/college/faculty/`;
    try {
      const res = await axios.post(postapi, facultyFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 201) {
        console.log(res.data);

        setFacultyFormData({
          name: "",
          campus_uid: id,
        });
        window.location.href = `/campus-student-list/${id}`;
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
      {error && <Error text="Something went wrong! " setError={setError} />}

      <div className="Mainsection">
        <h1>Add Campus</h1>
        <form onSubmit={hanldleSubmit}>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Faculty Name:</label>
              <input
                type="text"
                placeholder="Faculty Name"
                name="name"
                value={facultyFormData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
        <div className="campusSubmitButton">
          <Link
            to={`/campus-student-list/${id}`}
            className="subButton1 SubButton"
          >
            Cancel
          </Link>
          <button className="subButton3" onClick={hanldleSubmit}>
            {Loading ? "Saving" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

const FacultyForm = () => {
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

export default FacultyForm;
