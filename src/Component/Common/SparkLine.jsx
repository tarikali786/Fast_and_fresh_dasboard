import React from "react";
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const SparkLine = ({ id, width, height, currentColor, color }) => {
  const customData1 = [50, 300, 600, 800, 400, 900, 700];
  const datas = {
    labels,
    datasets: [
      {
        label: "2023",
        data: customData1,
        borderColor: currentColor,
        backgroundColor: color,
        fill: true,
      },
    ],
  };
  return (
    <Line
      datasetIdKey={id}
      options={options}
      data={datas}
      width={width}
      height={height}
    />
  );
};
