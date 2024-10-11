import DataTables from "react-data-table-component";
import { useNavigate } from "react-router-dom";

import "./style.css";
export const EmployeeTable = ({ columns, data }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/employee-details/${row.uid}`);
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
      />
    </>
  );
};
