import { EmployeeTable } from "./EmployeeTable";
import { Header } from "../Common/Header";
import { useEffect, useMemo, useState } from "react";
import { Button, Loading } from "../Common";
import { useRef } from "react";
import { get } from "../../hooks/api";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // html2canvas for capturing elements

export const Employees = () => {
  const Columns = useMemo(() => {
    return [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
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
      {
        name: "Status",
        selector: (row) => row.is_active,
        cell: (row) => {
          const bgColorClass = row.is_active ? "bg-sky-400" : "bg-orange-500";
          return (
            <span
              className={`border-1 w-20 flex justify-center py-2.5 text-white rounded-full ${bgColorClass}`}
            >
              {row.is_active ? "Active" : "InActive"}
            </span>
          );
        },
        sortable: true,
      },
    ];
  }, []);

  // Reference to the container element
  const ref = useRef();

  // Function to download the PDF

  const [employeeList, setEmployeeList] = useState([]);
  const api = `${import.meta.env.VITE_API_URL}/college/all-employee/`;
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmplList, setFilteredEmpList] = useState([]);

  const FetchCollegeList = async () => {
    setLoading(true);
    const response = await get(api);
    setEmployeeList(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    FetchCollegeList();
  }, []);

  const handleSearch = (e) => {
    const input = e.target.value.trim().toLowerCase();
    setSearchTerm(input);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredEmpList(employeeList);
    } else {
      const filteredData = employeeList.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm)
      );
      setFilteredEmpList(filteredData);
    }
  }, [searchTerm, employeeList]);

  if (loading) return <Loading />;

  return (
    <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
      {/* <Button text="Download Pdf" onClick={downloadPdf} /> */}
      <Header
        title="Employee"
        buttonName="Add Employee"
        Buttonlink="/add-employee"
        handleSearch={handleSearch}
      />
      <div id="container" ref={ref}>
        <EmployeeTable columns={Columns} data={filteredEmplList} />
      </div>
    </div>
  );
};
