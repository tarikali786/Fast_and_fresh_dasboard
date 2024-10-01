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
        name: "Employee Name",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRouteList, setFilteredRouteList] = useState([]);

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

  // Handle search input
  const handleSearch = (e) => {
    const input = e.target.value.trim().toLowerCase();
    setSearchTerm(input);
  };

  // Filter the list based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRouteList(routeList);
    } else {
      const filteredData = routeList.filter((route) =>
        route.name.toLowerCase().includes(searchTerm)
      );
      setFilteredRouteList(filteredData);
    }
  }, [searchTerm, routeList]);

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <Header
        title="Route"
        buttonName="Add Route"
        Buttonlink="/add-route"
        handleSearch={handleSearch}
      />
      <RouteTable columns={Columns} data={filteredRouteList} />
    </div>
  );
};
