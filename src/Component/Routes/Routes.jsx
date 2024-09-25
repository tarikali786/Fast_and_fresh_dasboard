import { Header } from "../Common/Header";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "../Common";
import { RouteTable } from "./RouteTable";
import { get } from "../../hooks/api";

export const RouteList = () => {
  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },

      {
        name: "Route Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Employee Namme",
        selector: (row) => row.employee.name,
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
  const [routeList, setRouteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = `${import.meta.env.VITE_API_URL}/dashboard/routeList/`;

  const FetchCollegeDetails = async () => {
    const response = await get(api);
    setRouteList(response?.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    FetchCollegeDetails();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <Header
        category="Page"
        title="Route"
        buttonName="Add Route"
        Buttonlink="/add-route"
        itmeList={routeList}
        setItemList={setRouteList}
      />
      <RouteTable columns={Columns} data={routeList} />
    </div>
  );
};
