import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../Common/Header";
import { CampusTable } from "./CampusTable";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./style.css";
import { Loading } from "../Common";
import { get } from "../../hooks/api";

export const Campus = () => {
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
        selector: (row) => row.tag_name,
        sortable: true,
      },

      {
        name: "Max student",
        selector: (row) => row.max_student_count,
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
  const navigate = useNavigate();

  const { id } = useParams();
  const [collegeDetails, setcollegeDetails] = useState(null);
  const [CampusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = `${
    import.meta.env.VITE_API_URL
  }/dashboard/college-details/${id}/`;

  const FetchCollegeDetails = async () => {
    const response = await get(api);
    setcollegeDetails(response?.data?.data);
    setCampusList(response?.data?.campus_data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    FetchCollegeDetails();
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
  const goBack = () => {
    navigate(-1); // Go to the previous page in the browser history
  };

  const goForward = () => {
    navigate(1);
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
        <h1 className="COllegeheading">college Details</h1>
        <p>{collegeDetails?.uid}</p>
        <form>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>College Name:</label>
              <input
                type="text"
                placeholder="Campus Name"
                name="name"
                value={collegeDetails?.name}
              />
            </div>
            <div className="college-input-card">
              <label>Schedule:</label>
              <input
                type="text"
                placeholder="Schedule"
                name="schedule"
                value={collegeDetails?.schedule}
              />
            </div>
          </div>
          <div className="college-input-container">
            <div className="college-input-card">
              <label>Monthly Payment:</label>
              <input
                type="text"
                placeholder="Monthly Payment"
                name="monthly_payment"
                value={collegeDetails?.monthly_payment}
              />
            </div>
            <div className="college-input-card">
              <label>Delivery Time:</label>
              <input
                type="time"
                placeholder="Delivery Time"
                name="delivery_time"
                value={collegeDetails?.delivery_time}
              />
            </div>
          </div>

          <div className="college-input-container">
            <div className="college-input-card1">
              <label>Campus Employee: </label>
              <select name="" id="" className="CollegeEmployee">
                {collegeDetails?.campus_employee?.map((e) => (
                  <option value="" key={e.uid}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="college-input-card">
              <label>Route:</label>
              <input
                type="text"
                placeholder="Route"
                name="routes"
                value={collegeDetails?.routes?.name}
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
                  collegeDetails?.created_at
                    ? formatDate(collegeDetails.created_at)
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
                  collegeDetails?.updated_at
                    ? formatDate(collegeDetails.updated_at)
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
          // category="Page"
          title="Campus"
          buttonName="Add Campus"
          Buttonlink={`/add-campus/${id}`}
        />
        <CampusTable
          columns={Columns}
          data={CampusList}
          tabletype="CampusList"
        />
      </div>
    </>
  );
};
