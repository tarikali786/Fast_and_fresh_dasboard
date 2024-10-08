import { Header } from "../Common/Header";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "../Common";
import { get } from "../../hooks/api";
import { DryAreaTable } from "./DryAreaTable";
export const DryArea = () => {
  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },

      {
        name: "Dry Area Id",
        selector: (row) => row.dry_area_id,
        sortable: true,
      },
      {
        name: "Row",
        selector: (row) => row.row,
        sortable: true,
      },

      {
        name: "Column",
        selector: (row) => row.column,
        sortable: true,
      },

      {
        name: "Status",
        selector: (row) => row.isActive,
        cell: (row) => {
          const bgColorClass = row.isActive ? "bg-sky-400" : "bg-orange-500";
          return (
            <span
              className={`border-1 w-20 flex justify-center py-2.5 text-white rounded-full ${bgColorClass}`}
            >
              {row.isActive ? "Active" : "InActive"}
            </span>
          );
        },
        sortable: true,
      },
    ];
  }, []);

  const [dryAreaList, setDryAreaList] = useState([]);
  const api = `${import.meta.env.VITE_API_URL}/college/dryarea/`;
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrylList, setFilteredDryList] = useState([]);

  const FetchCollegeList = async () => {
    setLoading(true);
    const response = await get(api);
    setDryAreaList(response.data);
    setLoading(false);
  };
  useEffect(() => {
    FetchCollegeList();
  }, []);

  const handleSearch = (e) => {
    const input = e.target.value.trim().toLowerCase();
    setSearchTerm(input);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredDryList(dryAreaList);
    } else {
      const filteredData = dryAreaList.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm)
      );
      setFilteredDryList(filteredData);
    }
  }, [searchTerm, dryAreaList]);

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <Header
        title="DryArea"
        buttonName="Add DryArea"
        Buttonlink="/add-dryArea"
        handleSearch={handleSearch}
      />
      <DryAreaTable columns={Columns} data={filteredDrylList} />
    </div>
  );
};
