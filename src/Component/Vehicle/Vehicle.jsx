import { Header } from "../Common/Header";
import { VehicleTable } from "./VehicleTable";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "../Common";
import { get } from "../../hooks/api";

export const Vehicle = () => {
  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      // {
      //   name: "Odo Meter Image",
      //   selector: (row) => (
      //     <img
      //       width={70}
      //       height={60}
      //       className="rounded-lg my-2"
      //       src={`${row.odo_meter_image}`}
      //     />
      //   ),
      // },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Make",
        selector: (row) => row.make,
        sortable: true,
      },
      // {
      //   name: "Odo Meter",
      //   selector: (row) => row.odo_meter,
      //   sortable: true,
      // },
      {
        name: "Number Plate",
        selector: (row) => row.number_plate,
        sortable: true,
      },

      {
        name: "Status",
        sortable: true,

        selector: (row) => row.isActive,
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
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = `${import.meta.env.VITE_API_URL}/college/vehicle/`;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVehicleList, setFilteredVehicleList] = useState([]);

  const FetchCollegeDetails = async () => {
    const response = await get(api);
    setVehicleList(response?.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    FetchCollegeDetails();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const input = e.target.value.trim().toLowerCase();
    setSearchTerm(input);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredVehicleList(vehicleList);
    } else {
      const filteredData = vehicleList.filter((veh) =>
        veh.name.toLowerCase().includes(searchTerm)
      );
      setFilteredVehicleList(filteredData);
    }
  }, [searchTerm, vehicleList]);

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <Header
        title="Vehicle"
        buttonName="Add Vehicle"
        Buttonlink="/add-vehicle"
        handleSearch={handleSearch}
      />
      <VehicleTable columns={Columns} data={filteredVehicleList} />
    </div>
  );
};
