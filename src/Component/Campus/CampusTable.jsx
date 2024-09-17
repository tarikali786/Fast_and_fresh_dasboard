import DataTables from "react-data-table-component";
import { useNavigate } from "react-router-dom";
export const CampusTable = ({ columns, data, tabletype }) => {
  const navigate = useNavigate();
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

  const handleRowClick = (row) => {
    if (tabletype === "CollegeList") {
      navigate(`/campus/${row.uid}`);
    } else if (tabletype === "CampusList") {
      navigate(`/campus-student-list/${row.uid}`);
    } else if (tabletype === "CampusStudentList") {
      navigate(`/campus-student-details/${row.uid}`);
    }
  };
  return (
    <>
      <DataTables
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        subHeader
        onRowClicked={handleRowClick}
        customStyles={customStyles}
      />
    </>
  );
};
