import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { get, patch, remove } from "../../hooks/api"; // Assuming you have an update method in your api hook

export const DryAreaDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dryAreaDetails, setDryAreaDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submit state
  const [updateDryArea, setUpdateDryArea] = useState({
    dry_area_id: "",
    row: "",
    column: "",
    isActive: "",
  });
  const api = `${import.meta.env.VITE_API_URL}/college/dryarea/${id}/`;

  // Fetch employee details
  const FetchDryAreaDetails = async () => {
    const response = await get(api);
    setDryAreaDetails(response?.data);

    const { dry_area_id, row, column, isActive } = response?.data;

    setUpdateDryArea({
      dry_area_id: dry_area_id,
      row: row,
      column: column,
      isActive: isActive,
    });
    setLoading(false);
  };
  console.log(dryAreaDetails);

  useEffect(() => {
    setLoading(true);
    FetchDryAreaDetails();
    setLoading(false);
  }, []);

  // Go back to previous page
  const goBack = () => {
    navigate(-1);
  };

  // Delete employee
  const handleDryAraeDelete = async () => {
    const deleteApi = `${import.meta.env.VITE_API_URL}/college/dryarea/${id}/`;

    const confirmation = window.confirm(
      "Are you sure you want to delete this Employee?"
    );

    if (confirmation) {
      await remove(deleteApi);
      navigate("/dry-area");
    } else {
      console.log("Employee deletion canceled");
    }
  };

  // Function to find changed fields
  const findChangedFields = () => {
    const updatedFields = {};
    Object.keys(updateDryArea).forEach((key) => {
      if (updateDryArea[key] !== dryAreaDetails[key]) {
        updatedFields[key] = updateDryArea[key];
      }
    });
    return updatedFields;
  };

  // Update employee details
  const handleDryAreaUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updateApi = `${
      import.meta.env.VITE_API_URL
    }/college/dryarea-patch/${id}/`;

    const updatedFields = findChangedFields();

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await patch(updateApi, updatedFields); // Only send updated fields
      if (response?.status === 200) {
        alert("DryArea updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update DryArea", error);
      alert("Error updating DryArea details");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDryArea((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
      <div>
        <button onClick={goBack} className="previousArrow">
          &#8592;
        </button>
      </div>
      <h1 className="COllegeheading">DryArea Details</h1>
      <p>{dryAreaDetails?.uid}</p>

      {/* Update form */}
      <form onSubmit={handleDryAreaUpdate}>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>DryArea Id:</label>
            <input
              type="number"
              placeholder="Dry Area Id"
              name="dry_area_id"
              value={updateDryArea?.dry_area_id || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="college-input-card">
            <label>Row:</label>
            <input
              type="number"
              placeholder="Row"
              name="row"
              value={updateDryArea?.row || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Column:</label>
            <input
              type="number"
              placeholder="Column"
              name="column"
              value={updateDryArea?.column || ""}
              onChange={handleInputChange}
              // readOnly
            />
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card">
            <label>IsAcitve:</label>
            <select
              name="IsAcitve"
              value={updateDryArea.isActive ? "true" : "false"}
              onChange={(e) =>
                setUpdateDryArea((prev) => ({
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

        <div className="campusSubmitButton">
          <button type="submit" className="subButton2" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="subButton1"
            onClick={handleDryAraeDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
