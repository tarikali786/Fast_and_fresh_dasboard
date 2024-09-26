import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  CampusPickupbagnumberColumn,
  FacultyColumn,
  FacultyPickupbagnumberColumn,
  otherClothDaysheetColumn,
  OtherPickupbagnumberColumn,
  StudentColumn,
  StudentRemarkColumn,
  WarehouseRemarkColumn,
} from "./TableColumn";
import { get } from "../../hooks/api";
import { formatDate } from "../../utils";
import "./style.css";

export const CollectionDetails = ({ setTableData, setTableColumn }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    ETA: "",
    current_status: "",
    no_tag: "",
    total_cloths: "",
    total_uniforms: "",
    supervisor: "",
    segregation_supervisor: "",
    drying_supervisor: "",
    pickup_driver: "",
    drop_driver: "",
    washing_supervisor: "",
  });

  const [collectionDetails, setCollectionDetails] = useState(null);
  const api = `${import.meta.env.VITE_API_URL}/college/collection/${id}/`;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const FetchCollectionDetails = async () => {
    setLoading(true);
    const response = await get(api);
    setCollectionDetails(response?.data?.data);
    setUpdateFormData({
      ETA: response?.data?.data?.ETA,
      current_status: response?.data?.data?.current_status,
      no_tag: response?.data?.data?.no_tag,
      total_cloths: response?.data?.data?.total_cloths,
      total_uniforms: response?.data?.data?.total_uniforms,
      supervisor: response?.data?.data?.supervisor,
      segregation_supervisor: response?.data?.data?.segregation_supervisor,
      drying_supervisor: response?.data?.data?.drying_supervisor,
      pickup_driver: response?.data?.data?.pickup_driver,
      drop_driver: response?.data?.data?.drop_driver,
      washing_supervisor: response?.data?.data?.washing_supervisor,
    });

    setLoading(false);
  };

  const FetchEmployeeList = async () => {
    setLoading(true);
    const api1 = `${import.meta.env.VITE_API_URL}/college/all-employee/`;
    const response = await get(api1);
    setEmployeeList(response.data.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const CollectionStatus = [
    {
      name: "READY TO PICK",
      value: "READY_TO_PICK",
    },
    {
      name: "INTRANSIT FROM CAMPUS",
      value: "INTRANSIT_FROM_cAMPUS",
    },
    {
      name: "DELIVERED TO WAREHOUSE",
      value: "DELIVERED_TO_WAREHOUSE",
    },
    {
      name: "WASHING",
      value: "WASHING",
    },
    {
      name: "WASHING DONE",
      value: "WASHING_DONE",
    },
    {
      name: "DRYING",
      value: "DRYING",
    },
    {
      name: "DRYING DONE",
      value: "DRYING_DONE",
    },
    {
      name: "IN SEGREGATION",
      value: "IN_SEGREGATION",
    },
    {
      name: "READY FOR DELIVERY",
      value: "READY_FOR_DELIVERY",
    },
    {
      name: "INTRANSIT FROM WAREHOUSE",
      value: "INTRANSIT_FROM_WAREHOUSE",
    },
    {
      name: "DELIVERED TO CAMPUS",
      value: "DELIVERED_TO_CAMPUS",
    },
    {
      name: "DELIVERED TO STUDENT",
      value: "DELIVERED_TO_STUDENT",
    },
  ];

  useEffect(() => {
    FetchCollectionDetails();
    FetchEmployeeList();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <div>
        <button onClick={goBack} className="previousArrow">
          &#8592;
        </button>
      </div>
      <h1 className="COllegeheading">Collection Details</h1>
      <p>{collectionDetails?.uid}</p>
      <form>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Campus Name:</label>
            <input
              type="text"
              placeholder="Campus Name"
              name="name"
              value={collectionDetails?.campus?.name}
              readOnly
            />
          </div>
          <div className="college-input-card">
            <label>ETA:</label>
            <input
              type="text"
              placeholder="ETA"
              name="ETA"
              value={updateFormData?.ETA}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="campus-input-card">
            <label>Current Status:</label>

            <select
              name="current_status"
              onChange={handleChange}
              className="CollegeEmployee"
              value={updateFormData?.current_status}
            >
              {CollectionStatus.map((e) => (
                <option key={e.uid} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="college-input-card">
            <label>No Tag Count:</label>
            <input
              type="number"
              placeholder="no_tag"
              name="no_tag"
              value={updateFormData?.no_tag}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="college-input-container">
          <div className="college-input-card">
            <label>Total Cloths:</label>
            <input
              type="number"
              placeholder="Total Cloths"
              name="total_cloths"
              value={updateFormData?.total_cloths}
              onChange={handleChange}
            />
          </div>
          <div className="college-input-card">
            <label>Total Uniforms:</label>
            <input
              type="number"
              placeholder="Total Uniforms"
              name="total_uniforms"
              value={updateFormData?.total_uniforms}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label>Campus Supervisor:</label>
            <select
              name="supervisor"
              onChange={handleChange}
              className="CollegeEmployee"
              value={updateFormData?.supervisor?.uid || ""}
            >
              {employeeList
                .filter((e) => e.employee_type === "Campus_Employee")
                .map((e) => (
                  <option key={e.uid} value={e.uid}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="campus-input-card  ">
            <label> Segregation Supervisor:</label>
            <select
              name="segregation_supervisor"
              onChange={handleChange}
              className="CollegeEmployee"
              value={updateFormData?.segregation_supervisor?.uid || ""}
            >
              {employeeList
                .filter((e) => e.employee_type === "Segregation")
                .map((e) => (
                  <option key={e.uid} value={e.uid}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label> Washing Supervisor:</label>
            <select
              name="washing_supervisor"
              onChange={handleChange}
              className="CollegeEmployee"
              value={updateFormData?.washing_supervisor?.uid || ""}
            >
              {employeeList
                .filter((e) => e.employee_type === "Washing")
                .map((e) => (
                  <option key={e.uid} value={e.uid}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="campus-input-card  ">
            <label> Drying Supervisor:</label>
            <select
              name="drying_supervisor"
              onChange={handleChange}
              className="CollegeEmployee"
              value={collectionDetails?.drying_supervisor?.uid || ""}
            >
              {employeeList
                .filter((e) => e.employee_type === "Drying")
                .map((e) => (
                  <option key={e.uid} value={e.uid}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label> Pickup Driver:</label>
            <select
              name="pickup_driver"
              onChange={handleChange}
              className="CollegeEmployee"
              value={collectionDetails?.pickup_driver?.uid || ""}
            >
              {employeeList
                .filter((e) => e.employee_type === "Driver")
                .map((e) => (
                  <option key={e.uid} value={e.uid}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="campus-input-card  ">
            <label> Drop Driver:</label>
            <select
              name="drop_driver"
              onChange={handleChange}
              className="CollegeEmployee"
              value={collectionDetails?.drop_driver?.uid || ""}
            >
              {employeeList
                .filter((e) => e.employee_type === "Driver")
                .map((e) => (
                  <option key={e.uid} value={e.uid}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Completed Segregation Range:</label>
            <textarea
              value={
                collectionDetails?.completed_segregation_range
                  ? Object.entries(
                      collectionDetails.completed_segregation_range
                    )
                      .map(([range, status]) => `${range}: ${status}`)
                      .join(", ")
                  : ""
              }
              readOnly
            />
          </div>
        </div>

        <div className=" collectionImgeContainer">
          <div className="college-input-card1 collectionImgeSubContainer ">
            <label>Daily Image Sheet :</label>
            <div className="collectionImgeCard">
              {collectionDetails?.daily_image_sheet?.length === 0 ? (
                <p className="notUploadedtext">Not Uploaded Yet</p>
              ) : (
                <>
                  {collectionDetails?.daily_image_sheet.map((img, index) => (
                    <a
                      key={index}
                      href={`${import.meta.env.VITE_API_URL}${img?.image}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${img?.image}`}
                        alt={`Image ${index + 1}`}
                        style={{ cursor: "pointer" }}
                      />
                    </a>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label> Campus pickup Time Image:</label>
            {collectionDetails?.campus_pickup_collection_image ? (
              <a
                href={`${import.meta.env.VITE_API_URL}${
                  collectionDetails?.campus_pickup_collection_image
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    collectionDetails?.campus_pickup_collection_image
                  }`}
                  alt={`Image + 1}`}
                  style={{ cursor: "pointer", borderRadius: "10px" }}
                />
              </a>
            ) : (
              <p className="notUploadedtext">Not Uploaded Yet</p>
            )}
          </div>

          <div className="campus-input-card  ">
            <label> Campus Drop Time Image:</label>
            {collectionDetails?.campus_drop_collection_image ? (
              <a
                href={`${import.meta.env.VITE_API_URL}${
                  collectionDetails?.campus_drop_collection_image
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    collectionDetails?.campus_drop_collection_image
                  }`}
                  alt={`Image + 1}`}
                  style={{ cursor: "pointer", borderRadius: "10px" }}
                />
              </a>
            ) : (
              <p className="notUploadedtext">Not Uploaded Yet</p>
            )}
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label> Warehouse Pickup Time Image:</label>
            {collectionDetails?.warehouse_pickup_image ? (
              <a
                href={`${import.meta.env.VITE_API_URL}${
                  collectionDetails?.warehouse_pickup_image
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    collectionDetails?.warehouse_pickup_image
                  }`}
                  alt={`Image + 1}`}
                  style={{ cursor: "pointer", borderRadius: "10px" }}
                />
              </a>
            ) : (
              <p className="notUploadedtext">Not Uploaded Yet</p>
            )}
          </div>
          <div className="campus-input-card  ">
            <label>Warehouse Drop Time Image:</label>
            {collectionDetails?.warehouse_drop_image ? (
              <a
                href={`${import.meta.env.VITE_API_URL}${
                  collectionDetails?.warehouse_drop_image
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    collectionDetails?.warehouse_drop_image
                  }`}
                  alt={`Image + 1}`}
                  style={{ cursor: "pointer", borderRadius: "10px" }}
                />
              </a>
            ) : (
              <p className="notUploadedtext">Not Uploaded Yet</p>
            )}
          </div>
        </div>

        <div className="college-input-container">
          <div className="college-input-card">
            <label>Created At:</label>

            <input
              type="text"
              placeholder="updated_at"
              name="created_at"
              value={
                collectionDetails?.created_at
                  ? formatDate(collectionDetails.created_at)
                  : ""
              }
              readOnly
            />
          </div>
          <div className="college-input-card">
            <label>Updated At:</label>
            <input
              type="text"
              placeholder="updated_at"
              name="updated_at"
              value={
                collectionDetails?.updated_at
                  ? formatDate(collectionDetails.updated_at)
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className="campusSubmitButton">
          <button className="subButton2">Update</button>
        </div>
      </form>
      <div className="campusSubmitButton1">
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(StudentColumn),
              setTableData(collectionDetails?.student_day_sheet);
          }}
        >
          Student Day Sheet
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(FacultyColumn),
              setTableData(collectionDetails?.faculty_day_sheet);
          }}
        >
          Faculty Day Sheet
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(StudentRemarkColumn),
              setTableData(collectionDetails?.student_remark);
          }}
        >
          Student Remark
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(WarehouseRemarkColumn),
              setTableData(collectionDetails?.student_remark);
          }}
        >
          Warehouse Remark
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(CampusPickupbagnumberColumn),
              setTableData(collectionDetails?.campus_pickup_bag_numbers);
          }}
        >
          Campus Pickup Bag Number
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(CampusPickupbagnumberColumn),
              setTableData(collectionDetails?.campus_drop_bag_numbers);
          }}
        >
          Campus Drop Bag Number
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(CampusPickupbagnumberColumn),
              setTableData(collectionDetails?.warehouse_pickup_bag_numbers);
          }}
        >
          Warehouse Pickup Bag Number
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(CampusPickupbagnumberColumn),
              setTableData(collectionDetails?.warehouse_drop_bag_numbers);
          }}
        >
          Warehouse Drop Bag Number
        </Link>

        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(FacultyPickupbagnumberColumn),
              setTableData(collectionDetails?.campus_pickup_faculty_bag_number);
          }}
        >
          Campus Faculty Pickup Bag Number
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(FacultyPickupbagnumberColumn),
              setTableData(collectionDetails?.campus_drop_faculty_bag_number);
          }}
        >
          Campus Faculty Drop Bag Number
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(FacultyPickupbagnumberColumn),
              setTableData(
                collectionDetails?.warehouse_pickup_faculty_bag_number
              );
          }}
        >
          Warehouse Faculty Pickup Bag Number
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(FacultyPickupbagnumberColumn),
              setTableData(
                collectionDetails?.warehouse_drop_faculty_bag_number
              );
          }}
        >
          Warehouse Faculty Drop Bag Number
        </Link>

        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(otherClothDaysheetColumn),
              setTableData(collectionDetails?.other_cloth_daysheet);
          }}
        >
          Other Cloth Day Sheet
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(OtherPickupbagnumberColumn),
              setTableData(collectionDetails?.other_cloth_campus_pickup);
          }}
        >
          Campus Other Cloth pickup
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(OtherPickupbagnumberColumn),
              setTableData(collectionDetails?.other_cloth_campus_drop);
          }}
        >
          Campus Other Cloth Drop
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(OtherPickupbagnumberColumn),
              setTableData(collectionDetails?.other_cloth_warehouse_pickup);
          }}
        >
          Warehouse Other Cloth Pickup
        </Link>
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(OtherPickupbagnumberColumn),
              setTableData(collectionDetails?.other_cloth_warehouse_drop);
          }}
        >
          Warehouse Other Cloth Drop
        </Link>
      </div>
    </div>
  );
};

export default CollectionDetails;
