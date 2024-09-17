import { EmployeeTable } from "./EmployeeTable";
import { Header } from "../Common/Header";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loading from "../Common/Loading";
export const Employees = () => {
  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Profile Image",
        selector: (row) => (
          <img
            width={70}
            height={60}
            className="rounded-lg my-2"
            src={`${import.meta.env.VITE_API_URL}${row.profile_image}`}
          />
        ),
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },

      {
        name: "Mobile",
        selector: (row) => row.mobile,
        sortable: true,
      },
      {
        name: "Type",
        selector: (row) => row.employee_type,
        sortable: true,
      },
      {
        name: "DOB",
        selector: (row) => (row.dob ? row.dob : ""),
        sortable: true,
      },
      {
        name: "Last Login",
        selector: (row) => row.last_login,
        sortable: true,
      },
    ];
  }, []);

  const [employeeList, setEmployeeList] = useState([]);
  const api = `${import.meta.env.VITE_API_URL}/college/all-employee/`;
  const [loading, setLoading] = useState(false);

  const FetchCollegeList = async () => {
    setLoading(true);

    try {
      const response = await axios.get(api);
      setEmployeeList(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchCollegeList();
  }, []);
  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4   bg-white rounded-3xl">
      <Header
        title="Empolyee"
        buttonName="Add Employee"
        Buttonlink="/add-employee"
      />
      <EmployeeTable columns={Columns} data={employeeList} />
    </div>
  );
};
