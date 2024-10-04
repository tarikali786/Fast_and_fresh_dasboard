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
  const [dryAreaFormData, setDryAreaFormData] = useState({
    dry_area_id: "",
    row: "",
    column: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDryAreaFormData({
      ...dryAreaFormData,
      [name]: value,
    });
  };

  const hanldleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postapi = `${import.meta.env.VITE_API_URL}/college/dryarea/`;
    try {
      const res = await axios.post(postapi, dryAreaFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 201) {
        setDryAreaFormData({
          dry_area_id: "",
          row: "",
          column: "",
        });
        window.location.href = `/dry-area`;
      }
    } catch (error) {
      setError(true);
      console.error("Error while creating the DryArea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Error text="Something went wrong! " setError={setError} />}

      <div className="Mainsection">
        <h1>Add DryArea</h1>
        <form onSubmit={hanldleSubmit}>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>DryArea Id:</label>
              <input
                type="number"
                placeholder="DryArea Id"
                name="dry_area_id"
                value={dryAreaFormData?.dry_area_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campus-input-card">
              <label>Row:</label>
              <input
                type="number"
                placeholder="Row"
                name="row"
                value={dryAreaFormData?.row}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Column:</label>
              <input
                type="number"
                placeholder="Column"
                name="column"
                value={dryAreaFormData?.column}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="campusSubmitButton">
            <Link to={`/dry-area`} className="subButton1 SubButton">
              Cancel
            </Link>
            <button
              type="submit"
              className="subButton3"
              // onClick={hanldleSubmit}
              disabled={Loading}
            >
              {Loading ? "Saving" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const DryAreaForm = () => {
  const [formType, setFormType] = useState("");

  return (
    <>
      {formType === "" && (
        <div className="campusInputContainer Mainsection">
          <h1>Please select a DryArea Submission Type</h1>
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
