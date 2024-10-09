import DataTables from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Header } from "../Common";
import { useEffect, useState } from "react";
export const CollectionTable2 = ({ columns, data, campusName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredstudentDaySheetList, setFilteredstudentDaySheetList] =
    useState([]);
  const handleSearch = (e) => {
    const input = e.target.value.trim().toLowerCase();
    setSearchTerm(input);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredstudentDaySheetList(data);
    } else {
      const filteredData = data.filter((stu) =>
        stu.tag_number.toLowerCase().includes(searchTerm)
      );
      setFilteredstudentDaySheetList(filteredData);
    }
  }, [searchTerm, filteredstudentDaySheetList]);
  const customStyles = {
    rows: {
      style: {
        minHeight: "56px",
        padding: "10px 2px",
        marginBottom: "10px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "2px",
        paddingRight: "2px",
      },
    },
    cells: {
      style: {
        paddingLeft: "2px",
        paddingRight: "2px",
      },
    },
  };

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <h1>{campusName}</h1>
      <Header
        title="Student Day Sheet"
        button="true"
        handleSearch={handleSearch}
        placeholder="Search By Tag Name"
      />
      <DataTables
        columns={columns}
        data={filteredstudentDaySheetList}
        pagination
        highlightOnHover
        subHeader
        customStyles={customStyles}
      />
    </div>
  );
};
