import EventBusyIcon from "@mui/icons-material/EventBusy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  CHART_COLORS,
  getBarChartOptions,
  createBarDataset,
} from "../../../utils/chartConfig";

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
    createBarDataset({
      label: "Planned Leave",
      data: [12, 15, 8, 14, 10, 6, 16, 12, 15, 8, 14, 10, 6, 16, 15, 10],
      color: CHART_COLORS.blue,
      borderRadius: 0,
      barThickness: 20,
    }),
    createBarDataset({
      label: "Unplanned Absent",
      data: [18, 25, 14, 28, 22, 12, 26, 18, 25, 14, 28, 22, 12, 26, 25, 18],
      color: CHART_COLORS.danger,
      borderRadius: 0,
      barThickness: 20,
    }),
    createBarDataset({
      label: "Total Absent",
      data: [30, 40, 22, 42, 32, 18, 42, 30, 40, 22, 42, 32, 18, 42, 40, 28],
      color: CHART_COLORS.primary,
      borderRadius: 0,
      barThickness: 20,
    }),
  ],
};

const options = getBarChartOptions({
  yStepSize: 10,
});

const Absentism = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs">
            <EventBusyIcon sx={{ fontSize: 22 }} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Daily Absenteeism
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Tracking planned vs unplanned absenteeism movement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
            Monthly Average: 4.8%
          </span>
        </div>
      </div>

      <div className="overflow-x-auto custom-chart-scrollbar pb-2">
        <div
          className="h-[240px]"
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
