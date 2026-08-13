import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = [
  "01 May",
  "02 May",
  "03 May",
  "04 May",
  "05 May",
  "06 May",
  "07 May",
  "08 May",
  "09 May",
  "10 May",
  "11 May",
  "12 May",
  "13 May",
  "14 May",
  "15 May",
  "16 May",
];

const chartData = {
  labels,
  datasets: [
    {
      label: "Requirement",
      data: [45, 55, 40, 60, 50, 34, 60, 45, 55, 40, 60, 50, 34, 60, 55, 45],
      backgroundColor: "#6F4AE7",
      borderRadius: 0,
      borderSkipped: false,
      barThickness: 20,
    },
    {
      label: "Present",
      data: [30, 46, 24, 50, 40, 20, 45, 30, 46, 24, 50, 40, 20, 45, 46, 32],
      backgroundColor: "#22C55E",
      borderRadius: 0,
      borderSkipped: false,
      barThickness: 20,
    },
    {
      label: "Total",
      data: [
        74, 94, 65, 109, 89, 52, 106, 74, 94, 65, 109, 89, 52, 106, 94, 78,
      ],
      backgroundColor: "#EF4444",
      borderRadius: 0,
      borderSkipped: false,
      barThickness: 20,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  animation: {
    duration: 700,
  },

  plugins: {
    legend: {
      position: "top",
      align: "end",

      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 25,
        boxWidth: 10,
        boxHeight: 10,

        color: "#374151",

        font: {
          size: 13,
          weight: "600",
        },
      },
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
        drawTicks: false,
      },

      border: {
        display: false,
      },

      ticks: {
        color: "#6B7280",
      },
    },

    y: {
      beginAtZero: true,

      grid: {
        display: false,
        drawBorder: false,
        drawTicks: false,
      },

      border: {
        display: false,
      },

      ticks: {
        stepSize: 20,
        color: "#6B7280",
      },
    },
  },
};

const DailyManpower = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <PeopleAltIcon
            sx={{
              color: "#6F4AE7",
              fontSize: 20,
            }}
          />
        </div>

        <div>
          <h1 className="text-sm font-bold text-gray-800">
            Daily Manpower Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Deployed headcount with day-over-day movement
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          className="h-[200px]"
          style={{
            minWidth: "1600px",
          }}
        >
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DailyManpower;
