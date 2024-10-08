import { useEffect, useMemo, useState } from "react";
import { Header } from "../Common/Header";
import { CampusTable } from "./CampusTable";
import { get } from "../../hooks/api";
import { Loading } from "../Common";
import "./style.css";

export const College = () => {
  const [collegeList, setCollegeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCollegeList, setFilteredCollegeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const api = `${import.meta.env.VITE_API_URL}/dashboard/collegeList/`;

  const FetchCollegeList = async () => {
    setLoading(true);
    try {
      const response = await get(api);
      setCollegeList(response.data.data);
      setFilteredCollegeList(response.data.data); // Set initially unfiltered
    } catch (error) {
      console.error("Error fetching college list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchCollegeList();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const input = e.target.value.trim().toLowerCase();
    setSearchTerm(input);
  };

  // Filter the list based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCollegeList(collegeList);
    } else {
      const filteredData = collegeList.filter((college) =>
        college.name.toLowerCase().includes(searchTerm)
      );
      setFilteredCollegeList(filteredData);
    }
  }, [searchTerm, collegeList]);

  console.log(collegeList);

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
        name: "Campus Supervisor",
        selector: (row) =>
          row?.campus_employee.map((emp) => emp.name).join(", "),
        sortable: true,
      },

      {
        name: "Routes",
        selector: (row) => (row.routes?.name ? row.routes.name : "No routes"),
        sortable: true,
      },
      {
        name: "Status",
        sortable: true,
        selector: (row) => row.isActive,
        cell: (row) => {
          let bgColorClass = row.isActive ? "bg-sky-400" : "bg-orange-500";
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

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl w-100%">
      <Header
        title="College"
        buttonName="Add College"
        Buttonlink="/add-college"
        handleSearch={handleSearch}
      />
      <CampusTable
        columns={Columns}
        data={filteredCollegeList}
        tabletype="CollegeList"
      />
    </div>
  );
};
