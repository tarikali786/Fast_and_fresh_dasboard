import DataTables from "react-data-table-component";
import { useNavigate } from "react-router-dom";
export const RouteTable = ({ columns, data }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/route-details/${row.uid}`);
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
