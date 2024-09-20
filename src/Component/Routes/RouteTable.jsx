import DataTables from "react-data-table-component";
export const RouteTable = ({ columns, data }) => {
  return (
    <>
      <DataTables
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        subHeader
      />
    </>
  );
};
