import EventBusyIcon from "@mui/icons-material/EventBusy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
      label: "Planned Leave",
      data: [12, 15, 8, 14, 10, 6, 16, 12, 15, 8, 14, 10, 6, 16, 15, 10],
      backgroundColor: "#3B82F6",
      borderRadius: {
        topLeft: 5,
        topRight: 5,
        bottomLeft: 0,
        bottomRight: 0,
      },
      borderSkipped: "bottom",
    },
    {
      label: "Unplanned Absent",
      data: [18, 25, 14, 28, 22, 12, 26, 18, 25, 14, 28, 22, 12, 26, 25, 18],
      backgroundColor: "#EF4444",
      borderRadius: {
        topLeft: 5,
        topRight: 5,
        bottomLeft: 0,
        bottomRight: 0,
      },
      borderSkipped: "bottom",
    },
    {
      label: "Total Absent",
      data: [30, 40, 22, 42, 32, 18, 42, 30, 40, 22, 42, 32, 18, 42, 40, 28],
      backgroundColor: "#6F4AE7",
      borderRadius: {
        topLeft: 5,
        topRight: 5,
        bottomLeft: 0,
        bottomRight: 0,
      },
      borderSkipped: "bottom",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1E293B",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
      padding: 10,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function (context) {
          return ` ${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      offset: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      border: {
        display: false,
      },
      barPercentage: 0.98,
      categoryPercentage: 0.4,
      ticks: {
        color: "#64748B",
        font: {
          size: 10,
          weight: "500",
        },
        padding: 5,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
        color: "#64748B",
        font: {
          size: 9,
        },
        padding: 8,
      },
      grid: {
        color: "#E8EDF5",
        drawTicks: false,
      },
      border: {
        display: false,
      },
    },
  },
};

const Absentism = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
              <EventBusyIcon sx={{ fontSize: 20 }} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Daily Absenteeism
              </h2>

              <p className="text-[10px] text-slate-500 mt-0.5">
                Tracking planned vs unplanned absenteeism movement
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Monthly average */}
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>

              <span className="text-[10px] font-semibold text-rose-600">
                Monthly Average: 4.8%
              </span>
            </span>

            {/* More button */}
            <button className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition">
              <MoreVertIcon
                sx={{
                  fontSize: 17,
                  color: "#64748B",
                }}
              />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-end items-center gap-4 mt-3">
          {/* Planned Leave */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>

            <span className="text-[9px] font-medium text-slate-500">
              Planned Leave
            </span>
          </div>

          {/* Unplanned Absent */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>

            <span className="text-[9px] font-medium text-slate-500">
              Unplanned Absent
            </span>
          </div>

          {/* Total Absent */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6F4AE7]"></span>

            <span className="text-[9px] font-medium text-slate-500">
              Total Absent
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Chart */}
      <div className="px-4 pb-4 pt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div
          className="h-[230px]"
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

export default Absentism;