import { useEffect, useMemo, useState } from "react";
import { Header } from "../Common/Header";
import { CampusTable } from "./CampusTable";
import axios from "axios";
import "./style.css";
import { Loading } from "../Common";
import { get } from "../../hooks/api";
export const College = () => {
  const [collegeList, setCollegeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = `${import.meta.env.VITE_API_URL}/dashboard/collegeList/`;

  const FetchCollegeList = async () => {
    setLoading(true);
    const response = await get(api);
    setCollegeList(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    FetchCollegeList();
  }, []);

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
        name: "Monthly Payment",
        selector: (row) => row.monthly_payment,
        sortable: true,
      },

      {
        name: "Delivery Time",
        selector: (row) => row.delivery_time,
        sortable: true,
      },
      {
        name: "Schedule",
        selector: (row) => row.schedule,
        sortable: true,
      },
      {
        name: "Routes",
        selector: (row) => (row.routes?.name ? row?.routes?.name : "No routes"),
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
      {
        name: "Action",
        cell: (row) => (
          <div className="">
            <button className="btn btn-primary" onClick={() => {}}>
              Edit
            </button>
          </div>
        ),
      },
    ];
  }, []);
  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl w-100%">
      <Header
        category="Page"
        title="College"
        buttonName="Add College"
        Buttonlink="/add-college"
        itmeList={collegeList}
        setItemList={setCollegeList}
      />
      <CampusTable
        columns={Columns}
        data={collegeList}
        tabletype="CollegeList"
      />
    </div>
  );
};
