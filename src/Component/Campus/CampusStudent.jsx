import { customersData } from "../../data/dummy";
import { CampusTable } from "./CampusTable";
import { Header } from "../Common/Header";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../Common";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./style.css";
import { get } from "../../hooks/api";

export const CampusStudent = () => {
  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Tag Name",
        selector: (row) => `${campusDetails?.tag_name}${row.tag_number}`,
        sortable: true,
      },

      {
        name: "branch",
        selector: (row) => row.branch,
        sortable: true,
      },
      {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
      },

      {
        name: "Mobile",
        selector: (row) => row.mobile,
        sortable: true,
      },

      {
        name: "Status",
        sortable: true,

        selector: (row) => row.isActive,
        cell: (row) => {
          let bgColorClass = "";
          switch (row.isActive) {
            case false:
              bgColorClass = "bg-orange-500";
              break;
            case true:
              bgColorClass = "bg-sky-400";
              break;

            default:
              bgColorClass = "bg-gray-950";
          }

          return (
            <span
              className={`border-1 w-20 flex justify-center py-2.5 text-white rounded-full ${bgColorClass}`}
            >
              {row.isActive ? "Active" : "InActive"}
            </span>
          );
        },
      },
    ];
  }, []);
  const Columns2 = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
    ];
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go to the previous page in the browser history
  };

  const goForward = () => {
    navigate(1);
  };

  const [campusDetails, setCampusDetails] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = `${import.meta.env.VITE_API_URL}/dashboard/campus-details/${id}/`;

  const FetchCampusDetails = async () => {
    const response = await get(api);
    setCampusDetails(response?.data?.data);
    setStudentList(response?.data?.student_list);
    setFacultyList(response?.data?.faculty_list);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    FetchCampusDetails();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes}${ampm}`;

    return `${day}-${month}-${year} T ${formattedTime}`;
  };
  if (loading) return <Loading />;

  return (
    <>
      <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
        <div>
          <button onClick={goBack} className="previousArrow">
            &#8592;
          </button>

          <button onClick={goForward} className="previousArrow">
            &#8594;
          </button>
        </div>
        <h1 className="COllegeheading">Campus Details</h1>
        <p>{campusDetails?.uid}</p>
        <form>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>Campus Name:</label>
              <input
                type="text"
                placeholder="Campus Name"
                name="name"
                value={campusDetails?.name}
              />
            </div>
            <div className="college-input-card">
              <label>Tag Name:</label>
              <input
                type="text"
                placeholder="Tag Name"
                name="tag_name"
                value={campusDetails?.tag_name}
              />
            </div>
          </div>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>Maximum Student:</label>
              <input
                type="text"
                placeholder="Maximum Student"
                name="max_student_count"
                value={campusDetails?.max_student_count}
              />
            </div>
            <div className="college-input-card">
              <label>Uniform:</label>
              <input
                type="text"
                placeholder="Delivery Time"
                name="uniform"
                value={campusDetails?.uniform}
              />
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
                  campusDetails?.created_at
                    ? formatDate(campusDetails.created_at)
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
                  campusDetails?.updated_at
                    ? formatDate(campusDetails.updated_at)
                    : ""
                }
                readOnly
              />
            </div>
          </div>
        </form>
        <div className="campusSubmitButton">
          <button className="subButton2">Update</button>
        </div>
      </div>
      <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
        <Header
          title="Student List "
          buttonName="Add Student"
          Buttonlink={`/add-student/${id}`}
        />
        <CampusTable
          columns={Columns}
          data={studentList}
          tabletype="CampusStudentList"
        />
      </div>
      <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
        <Header
          title="Faculty List "
          buttonName="Add Faculty"
          Buttonlink={`/add-faculty/${id}`}
        />
        <CampusTable columns={Columns2} data={facultyList} />
      </div>
    </>
  );
};
