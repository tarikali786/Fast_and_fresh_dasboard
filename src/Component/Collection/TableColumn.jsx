export const StudentColumn = () => [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Tag Number",
    selector: (row) => row.tag_number,
    sortable: true,
  },
  {
    name: "Campus Regular Cloths",
    selector: (row) => row.campus_regular_cloths,
    sortable: true,
  },

  {
    name: "Campus Uniform",
    selector: (row) => row.campus_uniforms,
    sortable: true,
  },

  {
    name: "Warehouse Regular Cloths",
    selector: (row) => row.ware_house_regular_cloths,
    sortable: true,
  },
  {
    name: "Warehouse Uniform",
    selector: (row) => row.ware_house_uniform,
    sortable: true,
  },

  {
    name: "Delivered",
    sortable: true,

    selector: (row) => row.delivered,
    cell: (row) => {
      let bgColorClass = "";
      switch (row.delivered) {
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
          {row.delivered ? "True" : "False"}
        </span>
      );
    },
  },
];

export const FacultyColumn = () => [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Faculty Name",
    selector: (row) => row?.faculty?.name,
    sortable: true,
  },
  {
    name: "Campus Regular Cloths",
    selector: (row) => row.regular_cloths,
    sortable: true,
  },

  {
    name: "Warehouse Regular Cloths",
    selector: (row) => row.ware_house_regular_cloths,
    sortable: true,
  },

  {
    name: "Delivered",
    sortable: true,

    selector: (row) => row.delivered,
    cell: (row) => {
      let bgColorClass = "";
      switch (row.delivered) {
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
          {row.delivered ? "True" : "False"}
        </span>
      );
    },
  },
];

export const StudentRemarkColumn = () => [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Tag Number",
    selector: (row) => row?.tag_number,
    sortable: true,
  },
  {
    name: "Remark",
    selector: (row) => row.remark,
    sortable: true,
  },

  {
    name: "Remark Type",
    selector: (row) => row.remark_type,
    sortable: true,
  },
  {
    name: "Resolution",
    selector: (row) => row.resolution,
    sortable: true,
  },
  {
    name: "Status",
    sortable: true,

    selector: (row) => row.remark_status,
    cell: (row) => {
      let bgColorClass = "";
      switch (row.remark_status) {
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
          {row.delivered ? "True" : "False"}
        </span>
      );
    },
  },
];

export const WarehouseRemarkColumn = () => [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Tag Number",
    selector: (row) => row?.tag_number,
    sortable: true,
  },
  {
    name: "Remark",
    selector: (row) => row.remark,
    sortable: true,
  },

  {
    name: "Employee",
    selector: (row) => row.employee?.name,
    sortable: true,
  },
];

export const CampusPickupbagnumberColumn = () => [
  {
    name: "Bag Number",
    selector: (row) => row?.bag_number,
    sortable: true,
  },
];

export const FacultyPickupbagnumberColumn = () => [
  {
    name: " Number of bag ",
    selector: (row) => row?.number_of_bag,
    sortable: true,
  },
  {
    name: "faculty",
    selector: (row) => row?.faculty?.name,
    sortable: true,
  },
  {
    name: "Photo",
    selector: (row) => (
        <img
          width={70}
          height={60}
          className="rounded-lg my-2"
          src={`${import.meta.env.VITE_API_URL}${row.photo}`}
        />
      ),
  },
];

export const otherClothDaysheetColumn = () => [
  {
    name: " Id",
    selector: (row) => row?.id,
    sortable: true,
  },
  {
    name: " Name",
    selector: (row) => row?.name,
    sortable: true,
  },
  {
    name: "Number of items",
    selector: (row) => row?.number_of_items,
    sortable: true,
  },
  {
    name: "Delivered",
    sortable: true,

    selector: (row) => row.delivered,
    cell: (row) => {
      let bgColorClass = "";
      switch (row.delivered) {
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
          {row.delivered ? "True" : "False"}
        </span>
      );
    },
  },
];

export const OtherPickupbagnumberColumn = () => [
  {
    name: " Number of bag ",
    selector: (row) => row?.number_of_bag,
    sortable: true,
  },

  {
    name: "Photo",
    selector: (row) => (
      <img
        width={70}
        height={60}
        className="rounded-lg my-2"
        src={`${import.meta.env.VITE_API_URL}${row.photo}`}
      />
    ),
  },
];
