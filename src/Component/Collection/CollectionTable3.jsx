import DataTables from "react-data-table-component";
import { Header } from "../Common";
import { useEffect, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../../data/Logo.png";
import "./pdf.css";

export const CollectionTable3 = ({
  columns,
  data,
  campusName,
  collectionId,
  delivered,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredstudentDaySheetList, setFilteredstudentDaySheetList] =
    useState([]);

  const handleSearch = (e) => {
    const input = e.target.value.trim().toLowerCase();
    setSearchTerm(input);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } else {
      return "delivery date missing";
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredstudentDaySheetList(data);
    } else {
      const filteredData = data.filter((stu) =>
        stu.tag_number.toLowerCase().includes(searchTerm)
      );
      setFilteredstudentDaySheetList(filteredData);
    }
  }, [searchTerm, data]);

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

  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");

    // Temporarily make the content visible for PDF generation
    input.style.visibility = "visible";

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();

        const imgWidth = 190; // width in mm
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("Student_Day_Sheet.pdf");
      })
      .finally(() => {
        // Hide the content again after PDF generation
        input.style.visibility = "hidden";
      });
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-6 p-2 md:p-4 bg-white rounded-3xl">
        <h1>{campusName}</h1>
        <Header
          title="Student Day Sheet"
          button="true"
          handleSearch={handleSearch}
          placeholder="Search By Tag Name"
        />
        <button onClick={downloadPDF} className="downlaodBdfButton">
          Download PDF
        </button>
        <DataTables
          columns={columns}
          data={filteredstudentDaySheetList}
          pagination
          highlightOnHover
          subHeader
          customStyles={customStyles}
        />
      </div>

      {/* Hidden content for PDF generation */}
      <div id="pdf-content" style={{ paddingBottom: "2rem" }}>
        <div className="collectionTable">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <h1 className="campusName">Campus Name: {campusName}</h1>
          <h1 className="campusName">Collection Number: {collectionId}</h1>
          <p className="studentDay">Student Day Sheet</p>
        </div>
        <div className="tableHead">
          <p>Id</p>
          {/* <p>Collection Id</p> */}
          <p>Tag Number</p>
          <p>Campus Regular Cloths </p>
          <p>Campus Uniform</p>
          <p>Warehouse Regular Cloths</p>
          <p>Warehouse Uniform</p>
          <p>Delivered</p>
        </div>
        {data?.map((row, id) => (
          <div className="tableBody" key={id}>
            <p>{id}</p>
            <p>{row.tag_number}</p>
            <p>{row.campus_regular_cloths}</p>
            <p>{row.campus_uniforms}</p>
            <p>{row.ware_house_regular_cloths}</p>
            <p>{row.ware_house_uniform}</p>
            <p>{row.delivered ? formatDate(delivered) : "Not Delivered Yet"}</p>
          </div>
        ))}
      </div>
    </>
  );
};
