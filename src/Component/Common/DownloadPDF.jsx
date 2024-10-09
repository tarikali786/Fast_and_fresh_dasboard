import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadPDF = ({ jsonData, name }) => {
  const tableRef = useRef(); // Ref to the table

  const generatePDF = async () => {
    const element = tableRef.current;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Increase the scale for better quality
        useCORS: true, // Enable CORS to load external resources
        allowTaint: false, // Prevent issues with external images
        logging: false, // Disable logging
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 295; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${name}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <button onClick={generatePDF} className="download-btn">
        Download PDF
      </button>
      {/* Hidden table to be used for generating the PDF */}
      <div style={{ display: "none" }}>
        <table ref={tableRef} border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Campus Supervisor</th>
              <th>Routes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jsonData?.map((college, index) => (
              <tr key={index}>
                <td>{college.id}</td>
                <td>{college.name}</td>
                <td>
                  {college.campus_employee
                    ? college.campus_employee.map((emp) => emp.name).join(", ")
                    : "N/A"}
                </td>
                <td>{college.routes?.name || "No routes"}</td>
                <td>{college.isActive ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownloadPDF;
