import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

// Define labels for the months
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SparkLine = ({
  id,
  width,
  height,
  currentColor,
  color,
  data = [],
}) => {
  const [year, setYear] = useState("2024");
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const earningsData = new Array(12).fill(0);
  data.forEach((entry) => {
    const entryDate = new Date(entry.month);
    const entryYear = entryDate.getFullYear();
    const entryMonth = entryDate.getMonth();

    if (entryYear.toString() === year) {
      earningsData[entryMonth] = entry.count; // Assign earnings to the correct month
    }
  });

  // Chart data with dynamic earnings for the selected year
  const chartData = {
    labels,
    datasets: [
      {
        label: year,
        data: earningsData,
        borderColor: currentColor,
        backgroundColor: color,
        fill: true,
      },
    ],
  };

  return (
    <div>
      {/* Dropdown to select the year */}
      {/* <div style={{marginBottom:"1rem"}}>
        <label htmlFor="year-select">Select Year: </label>
        <select id="year-select" value={year} onChange={handleYearChange}>
          <option value="2023">2024</option>
          <option value="2023">2023</option>
          <option value="2023">2022</option>
          <option value="2023">2021</option>
          <option value="2024">2024</option>
        </select>
      </div> */}

      {/* Render the Line chart */}
      <Line
        datasetIdKey={id}
        options={options}
        data={chartData}
        width={width}
        height={height}
      />
    </div>
  );
};
