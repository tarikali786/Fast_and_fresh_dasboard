import axios from "axios";
import { useEffect, useState } from "react";
import { Loading } from "../Common";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { CollectionTable2 } from "./CollectionTable2";
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

export const CollectionDetails = ({
  setTableData,
  setTableColumn,
  setCampusName,
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

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
    setLoading(false);
  };

  useEffect(() => {
    FetchCollectionDetails();
  }, []);



  const FetchEmployeeList = async () => {
    setLoading(true);
    const api1 = `${import.meta.env.VITE_API_URL}/college/all-employee/`;
    const response = await get(api1);

    setEmployeeList(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
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
            <label>Delivery Date:</label>
            <input
              type="date"
              placeholder="delivery_date"
              name="delivery_date"
              value={collectionDetails?.delivery_date}
              readOnly
            />
          </div>
        </div>
        <div className="college-input-container">
          <div className="college-input-card">
            <label>Current Status:</label>
            <input
              type="text"
              placeholder="current_status"
              name="current_status"
              value={collectionDetails?.current_status}
              readOnly
            />
          </div>
          <div className="college-input-card">
            <label>No Tag Count:</label>
            <input
              type="number"
              placeholder="no_tag"
              name="no_tag"
              value={collectionDetails?.no_tag}
              readOnly
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
              value={collectionDetails?.total_cloths}
              readOnly
            />
          </div>
          <div className="college-input-card">
            <label>Total Uniforms:</label>
            <input
              type="number"
              placeholder="Total Uniforms"
              name="total_uniforms"
              value={collectionDetails?.total_uniforms}
              readOnly
            />
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label>Campus Supervisor:</label>
            <input
              type="text"
              placeholder="Campus Supervisor"
              name="supervisor"
              value={collectionDetails?.supervisor?.name || ""}
              readOnly
            />
          </div>
          <div className="campus-input-card  ">
            <label> Segregation Supervisor:</label>
            <input
              type="text"
              placeholder="Segregation Supervisor"
              name="segregation_supervisor"
              value={collectionDetails?.segregation_supervisor?.name || ""}
              readOnly
            />
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label> Washing Supervisor:</label>
            <input
              type="text"
              placeholder="Washing Supervisor"
              name="washing_supervisor"
              value={collectionDetails?.washing_supervisor?.name || ""}
              readOnly
            />
          </div>
          <div className="campus-input-card  ">
            <label> Drying Supervisor:</label>
            <input
              type="text"
              placeholder="Drying Supervisor"
              name="drying_supervisor"
              value={collectionDetails?.drying_supervisor?.name || ""}
              readOnly
            />
          </div>
        </div>

        <div className="campus-input-container">
          <div className="campus-input-card  ">
            <label> Pickup Driver:</label>
            <input
              type="text"
              placeholder=" Pickup Driver"
              name="pickup_driver"
              value={collectionDetails?.pickup_driver?.name || ""}
              readOnly
            />
          </div>
          <div className="campus-input-card  ">
            <label> Drop Driver:</label>
            <input
              type="text"
              placeholder=" Drop Driver"
              name="drop_driver"
              value={collectionDetails?.drop_driver?.name || ""}
              readOnly
            />
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
      </form>
      <div className="campusSubmitButton1">
        <Link
          to="/collection-details"
          className="subButton3"
          onClick={() => {
            setTableColumn(StudentColumn),
              setTableData(collectionDetails?.student_day_sheet);
            setCampusName(collectionDetails?.campus?.name);
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
      {/* <div className="campusSubmitButton">
        <button className="subButton2">Update</button>
      </div> */}
    </div>
  );
};

export default CollectionDetails;
