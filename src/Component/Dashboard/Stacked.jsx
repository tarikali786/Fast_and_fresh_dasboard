import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      stacked: true, // Stack the bars on the x-axis
    },
    y: {
      stacked: true, // Stack the bars on the y-axis
    },
  },
};
export const stackedChartData = [
  [
    { x: "Jan", y: 111.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 169.9 },
    { x: "Jun", y: 179.9 },
    { x: "July", y: 189.9 },
  ],
  [
    { x: "Jan", y: 111.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 19.9 },
    { x: "Jun", y: 179.9 },
    { x: "July", y: 89.9 },
  ],
];
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const expenseData = stackedChartData[0];
const budgetData = stackedChartData[1];
export const data = {
  labels,
  datasets: [
    {
      label: "Expense",
      data: expenseData.map((item) => item.y),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Budget",
      data: budgetData.map((item) => item.y),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const Stacked = () => {
  return <Bar options={options} data={data} height={"100"} width={"100%"} />;
};
