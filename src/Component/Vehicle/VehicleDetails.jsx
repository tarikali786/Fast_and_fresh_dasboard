import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { get, patch, remove } from "../../hooks/api"; // Assuming you have patch method
import { fetchEmployeTypeList, formatDate } from "../../utils";

export const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [driverList, setDriverList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number_plate: "",
    make: "",
    odo_meter: "",
    last_driver_uid: "",
    fuel_level: "",
    isActive: "",
  });

  const api = `${import.meta.env.VITE_API_URL}/college/vehicle/${id}/`;

  const fetchVehicleDetails = async () => {
    try {
      setLoading(true);
      const response = await get(api);
      const driverRes = await fetchEmployeTypeList("Driver");
      setDriverList(driverRes);
      setVehicleDetails(response?.data);
      setFormData({
        name: response?.data?.name || "",
        number_plate: response?.data?.number_plate || "",
        make: response?.data?.make || "",
        odo_meter: response?.data?.odo_meter || "",
        last_driver_uid: response?.data?.last_driver?.uid || "",
        fuel_level: response?.data?.fuel_level || "",
        isActive: response?.data?.isActive || "",
      });
    } catch (error) {
      console.error("Failed to fetch vehicle details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await patch(api, formData); // Send the updated formData, not vehicleDetails
      alert("Vehicle details updated successfully");
      fetchVehicleDetails(); // Fetch updated vehicle details
    } catch (error) {
      console.error("Failed to update vehicle", error);
    } finally {
      setLoading(false);
    }
  };
  // Delete employee
  const handleVehicleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this Vehilce?"
    );

    if (confirmation) {
      await remove(api);
      navigate("/vehicle");
    } else {
      console.log("Employee deletion canceled");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
      <div>
        <button onClick={goBack} className="previousArrow">
          &#8592;
        </button>
      </div>
      <h1 className="COllegeheading">Vehicle Details</h1>
      <p>{vehicleDetails?.uid}</p>
      <form onSubmit={updateVehicle}>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Vehicle Name:</label>
            <input
              type="text"
              placeholder="Vehicle Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="college-input-card">
            <label>Number Plate:</label>
            <input
              type="text"
              placeholder="Number Plate"
              name="number_plate"
              value={formData.number_plate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Make:</label>
            <input
              type="text"
              placeholder="Make"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
            />
          </div>
          <div className="college-input-card">
            <label>Odo Meter:</label>
            <input
              type="text"
              placeholder="Odo Meter"
              name="odo_meter"
              value={formData.odo_meter}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="campus-input-card">
            <label>Driver:</label>
            <select
              name="last_driver_uid"
              value={formData?.last_driver_uid}
              onChange={handleInputChange}
              className="CollegeEmployee"
            >
              <option value="" disabled>
                Select Driver
              </option>
              {driverList.map((emp) => (
                <option key={emp.uid} value={emp.uid}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          <div className="college-input-card">
            <label>Fuel Level:</label>
            <input
              type="text"
              placeholder="Fuel Level"
              name="fuel_level"
              value={formData.fuel_level}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="campus-input-card">
            <label>IsAcitve:</label>
            <select
              name="isActive"
              value={formData.isActive ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true", // Convert string to boolean
                }))
              }
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
              name="created_at"
              value={
                vehicleDetails?.created_at
                  ? formatDate(vehicleDetails.created_at)
                  : ""
              }
              readOnly
            />
          </div>
          <div className="college-input-card">
            <label>Updated At:</label>
            <input
              type="text"
              name="updated_at"
              value={
                vehicleDetails?.updated_at
                  ? formatDate(vehicleDetails.updated_at)
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
          <button className="subButton1" onClick={handleVehicleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
