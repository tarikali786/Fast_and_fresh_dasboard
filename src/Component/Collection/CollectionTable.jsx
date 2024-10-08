import DataTables from "react-data-table-component";
import { useNavigate } from "react-router-dom";
export const CollectionTable = ({ columns, data, tabletype }) => {
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
    navigate(`/collection-details/${row.uid}`);
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
