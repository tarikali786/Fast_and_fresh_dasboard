import DataTables from "react-data-table-component";
import { useNavigate } from "react-router-dom";
export const VehicleTable = ({ columns, data, tabletype }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/vehicle-details/${row.uid}`);
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
