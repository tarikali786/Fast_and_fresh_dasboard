import { useEffect, useMemo, useState } from "react";
import { Header } from "../Common/Header";
import "./style.css";
import { CollectionTable } from "./CollectionTable";
import { Loading } from "../Common";
import { get } from "../../hooks/api";
export const Collection = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [loading, setLoading] = useState(false);

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
        name: "ETA",
        selector: (row) => row?.ETA,
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
  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl w-100%">
      <Header
        category="Page"
        title="Collection"
        buttonName="Add Collection"
        // Buttonlink="/add-collection"
        Buttonlink="#"
      />
      <CollectionTable
        columns={Columns}
        data={collectionList}
        tabletype="CollegeList"
      />
    </div>
  );
};
