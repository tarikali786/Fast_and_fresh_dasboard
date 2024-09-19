import "./styleForm.css";

import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./styleForm.css";

import { Link } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const api = `${import.meta.env.VITE_API_URL}/college/all-employee/`;

  const [vehicleFormData, setvehicleFormData] = useState({
    name: "",
    make: "",
    odo_meter_image: null,
    spare_tyre: null,
    front_side: null,
    left_side: null,
    right_side: null,
    back_side: null,
    last_driver_uid: "",
    fuel_level: "",
    odo_meter: "",
    number_plate: "",

    // Expenses
    // expense_type: "",
    // amount: "",
    // expense_date: "",
    // image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setvehicleFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setvehicleFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const postapi = `${import.meta.env.VITE_API_URL}/college/vehicle/`;

    const formData = new FormData();
    Object.keys(vehicleFormData).forEach((key) => {
      formData.append(key, vehicleFormData[key]);
    });


    try {
      const res = await axios.post(postapi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {

        // Reset form data after successful submission
        setvehicleFormData({
          name: "",
          make: "",
          odo_meter_image: null,
          spare_tyre: null,
          front_side: null,
          left_side: null,
          right_side: null,
          back_side: null,
          last_driver_uid: "",
          fuel_level: "",
          odo_meter: "",
          number_plate: "",
          // Expenses
          expense_type: "",
          amount: "",
          expense_date: "",
          image: null,
        });

        // Redirect after submission
        window.location.href = `/vehicle/`;
      }
    } catch (error) {
      setError(true);
      console.error("Error while creating the vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="Mainsection">
        <h1>Add Vehicle</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Campus Name"
                name="name"
                value={vehicleFormData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Make:</label>
              <input
                type="text"
                placeholder="Make"
                name="make"
                value={vehicleFormData.make}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Odo Meter:</label>
              <input
                type="number"
                placeholder="Odo Meter"
                name="odo_meter"
                value={vehicleFormData.odo_meter}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Number Plate:</label>
              <input
                type="text"
                placeholder="Number Plate"
                name="number_plate"
                value={vehicleFormData.number_plate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Fuel level:</label>
              <input
                type="number"
                placeholder="Fuel Level"
                name="fuel_level"
                value={vehicleFormData.fuel_level}
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Driver:</label>
              <select
                name="last_driver_uid"
                value={vehicleFormData.last_driver_uid}
                onChange={handleInputChange}
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

          {/* Handling image uploads */}
          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Odo Meter Image:</label>
              <input
                type="file"
                accept="image/*"
                name="odo_meter_image"
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Spare Tyre Image:</label>
              <input
                type="file"
                accept="image/*"
                name="spare_tyre"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Front Side Image:</label>
              <input
                type="file"
                accept="image/*"
                name="front_side"
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Left Side Image:</label>
              <input
                type="file"
                accept="image/*"
                name="left_side"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="campus-input-container">
            <div className="campus-input-card">
              <label>Back Side Image:</label>
              <input
                type="file"
                accept="image/*"
                name="back_side"
                onChange={handleInputChange}
              />
            </div>
            <div className="campus-input-card">
              <label>Right Side Image:</label>
              <input
                type="file"
                accept="image/*"
                name="right_side"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>

        <div className="campusSubmitButton">
          <Link to="/vehicle" className="subButton1 SubButton">
            Cancel
          </Link>
          <button
            className="subButton3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

const VehicleForm = () => {
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

export default VehicleForm;
