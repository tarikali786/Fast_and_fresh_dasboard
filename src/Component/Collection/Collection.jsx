import { useEffect, useMemo, useState } from "react";
import { Header } from "../Common/Header";
import "./style.css";
import { CollectionTable } from "./CollectionTable";
import { Loading } from "../Common";
import { get } from "../../hooks/api";

export const Collection = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    text: "",
    date: "",
  });
  const [filteredCollectionList, setFilteredCollectionList] = useState([]);

  const api = `${import.meta.env.VITE_API_URL}/dashboard/collectionList/`;

  const FetchCollegeList = async () => {
    setLoading(true);
    const response = await get(api);
    setCollectionList(response.data);
    setLoading(false);
  };

  useEffect(() => {
    FetchCollegeList();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Campus Name",
        selector: (row) => row?.campus?.name,
        sortable: true,
      },

      {
        name: "Campus Supervisor",
        selector: (row) => row?.supervisor?.name,
        sortable: true,
      },
      {
        name: "Total Cloths",
        selector: (row) => row?.total_cloths,
        sortable: true,
      },
      {
        name: "Total Uniforms",
        selector: (row) => row?.total_uniforms,
        sortable: true,
      },
      {
        name: "Collection Date",

        selector: (row) => row?.created_at && formatDate(row?.created_at),
        sortable: true,
      },
      {
        name: "Expected Delivery Date",
        selector: (row) =>
          row?.expected_delivery_date &&
          formatDate(row?.expected_delivery_date),
        sortable: true,
      },
      {
        name: "Delivery Date",
        selector: (row) =>
          row?.delivery_date
            ? formatDate(row?.delivery_date)
            : "Not Delivered Yet",
        sortable: true,
      },
      {
        name: "Status",
        sortable: true,
        selector: (row) => row?.isActive,
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

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter the list based on campus name and date
  useEffect(() => {
    let filteredData = collectionList;

    // Filter by campus name
    if (searchTerm.text) {
      filteredData = filteredData.filter((collection) =>
        collection?.campus?.name
          ?.toLowerCase()
          .includes(searchTerm.text.toLowerCase())
      );
    }

    // Filter by date (created_at or delivery_date)
    if (searchTerm.date) {
      const selectedDate = new Date(searchTerm.date);
      filteredData = filteredData.filter((collection) => {
        const createdAt = new Date(collection?.created_at);
        const deliveryDate = new Date(collection?.delivery_date);

        // Compare selected date with created_at or delivery_date
        return (
          selectedDate.toDateString() === createdAt.toDateString() ||
          selectedDate.toDateString() === deliveryDate.toDateString()
        );
      });
    }

    setFilteredCollectionList(filteredData);
  }, [searchTerm, collectionList]);

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl w-100%">
      <Header
        title="Collection & Delivery Updates"
        // buttonName="Add Collection"
        Buttonlink="#"
        handleSearch={handleSearch}
        button="true"
        dateFilter
        placeholder="Search by Campus name "
      />
      <CollectionTable
        columns={Columns}
        data={filteredCollectionList}
        tabletype="CollegeList"
      />
    </div>
  );
};
