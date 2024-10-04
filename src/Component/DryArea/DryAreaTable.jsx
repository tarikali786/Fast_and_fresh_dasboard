import DataTables from "react-data-table-component";
import { useNavigate } from "react-router-dom";

export const DryAreaTable = ({ columns, data }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/dryArea-details/${row.uid}`);
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
