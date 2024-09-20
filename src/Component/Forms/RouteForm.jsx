import { useEffect, useState } from "react";
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
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  const api = `${import.meta.env.VITE_API_URL}/college/all-employee/`;

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

  const [RouteFormData, setRouteFormData] = useState({
    name: "",
    employee_uid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteFormData({
      ...RouteFormData,
      [name]: value,
    });
  };

  const hanldleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postapi = `${import.meta.env.VITE_API_URL}/college/routes/`;
    try {
      const res = await axios.post(postapi, RouteFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 201) {
        setRouteFormData({
          name: "",
          employee_uid: "",
        });
        window.location.href = `/routes`;
      }
    } catch (error) {
      setError(true);
      console.error("Error while creating the Route:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(RouteFormData);

  return (
    <>
      {error && <Error text="Something went wrong! " setError={setError} />}

      <div className="Mainsection">
        <h1>Add Route</h1>
        <form onSubmit={hanldleSubmit}>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Route Name:</label>
              <input
                type="text"
                placeholder="Route Name"
                name="name"
                value={RouteFormData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campus-input-card  ">
              <label>Campus Employee:</label>
              <select
                name="employee_uid"
                value={RouteFormData.employee_uid}
                onChange={handleChange}
                className="CollegeEmployee"
              >
                {employeeList?.map(
                  (e) =>
                    e.employee_type === "Driver" && (
                      <option key={e.uid} value={e.uid}>
                        {e.name}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        </form>
        <div className="campusSubmitButton">
          <Link to={`/routes`} className="subButton1 SubButton">
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

export const RouteForm = () => {
  const [formType, setFormType] = useState("");

  return (
    <>
      {formType === "" && (
        <div className="campusInputContainer Mainsection">
          <h1>Please select a Route Submission Type</h1>
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
