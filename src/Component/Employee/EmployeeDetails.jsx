import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { get, patch, remove } from "../../hooks/api"; // Assuming you have an update method in your api hook

export const EmployeeDetails = () => {
  const Employeetype = [
    { name: "Admin" },
    { name: "Campus_Employee" },
    { name: "Driver" },
    { name: "Washing" },
    { name: "Drying" },
    { name: "Segregation" },
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submit state
  const [updateEmployee, setUpdateEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    aadhar_number: "",
    employee_type: "",
    dob: "",
  });
  const api = `${
    import.meta.env.VITE_API_URL
  }/dashboard/employee-details/${id}/`;

  // Fetch employee details
  const FetchemployeeDetails = async () => {
    const response = await get(api);
    setEmployeeDetails(response?.data?.data);
    const { name, email, mobile, aadhar_number, employee_type, dob } = response?.data?.data;

    setUpdateEmployee({
      name: name,
      email: email,
      mobile: mobile,
      aadhar_number: aadhar_number,
      employee_type: employee_type,
      dob: dob,
    });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    FetchemployeeDetails();
  }, []);

  // Go back to previous page
  const goBack = () => {
    navigate(-1);
  };

  // Delete employee
  const handleEmployeeDelete = async () => {
    const deleteApi = `${
      import.meta.env.VITE_API_URL
    }/college/employee-delete/${id}/`;

    const confirmation = window.confirm(
      "Are you sure you want to delete this Employee?"
    );

    if (confirmation) {
      await remove(deleteApi);
      navigate("/employees");
    } else {
      console.log("Employee deletion canceled");
    }
  };

  // Function to find changed fields
  const findChangedFields = () => {
    const updatedFields = {};
    Object.keys(updateEmployee).forEach((key) => {
      if (updateEmployee[key] !== employeeDetails[key]) {
        updatedFields[key] = updateEmployee[key];
      }
    });
    return updatedFields;
  };

  // Update employee details
  const handleEmployeeUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updateApi = `${
      import.meta.env.VITE_API_URL
    }/college/employee-update/${id}/`;

    const updatedFields = findChangedFields();

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await patch(updateApi, updatedFields); // Only send updated fields
      if (response?.status === 200) {
        alert("Employee updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update employee", error);
      alert("Error updating employee details");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateEmployee((prevDetails) => ({
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
      <h1 className="COllegeheading">Employee Details</h1>
      <p>{employeeDetails?.uid}</p>

      {/* Update form */}
      <form onSubmit={handleEmployeeUpdate}>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Employee Name"
              name="name"
              value={updateEmployee?.name || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="college-input-card">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={updateEmployee?.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="college-input-container">
          <div className="college-input-card">
            <label>Mobile Number:</label>
            <input
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={updateEmployee?.mobile || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="college-input-card">
            <label>Aadhar Number:</label>
            <input
              type="text"
              placeholder="Aadhar Number"
              name="aadhar_number"
              value={updateEmployee?.aadhar_number || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card">
            <label>Employee Type:</label>

            <select
              name="employee_type"
              // className="CollegeEmployee"
              value={updateEmployee.employee_type}
              onChange={handleInputChange}
              className="CollegeEmployee"
            >
              {Employeetype?.map((employee) => (
                <option key={employee.name} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="college-input-card">
            <label>DOB:</label>
            <input
              type="date"
              placeholder="DOB"
              name="dob"
              value={updateEmployee?.dob || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="campusSubmitButton">
          <button type="submit" className="subButton2" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="subButton1"
            onClick={handleEmployeeDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
