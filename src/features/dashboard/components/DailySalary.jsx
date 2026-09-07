import PaymentsIcon from "@mui/icons-material/Payments";
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
      label: "Regular Wages",
      data: [140, 155, 130, 165, 150, 110, 160, 140, 155, 130, 165, 150, 110, 160, 155, 138],
      color: CHART_COLORS.teal,
      borderRadius: 0,
      barThickness: 20,
    }),
    createBarDataset({
      label: "Overtime (OT)",
      data: [25, 35, 18, 40, 30, 15, 38, 25, 35, 18, 40, 30, 15, 38, 35, 22],
      color: CHART_COLORS.warning,
      borderRadius: 0,
      barThickness: 20,
    }),
    createBarDataset({
      label: "Total Payout",
      data: [165, 190, 148, 205, 180, 125, 198, 165, 190, 148, 205, 180, 125, 198, 190, 160],
      color: CHART_COLORS.primary,
      borderRadius: 0,
      barThickness: 20,
    }),
  ],
};

const options = getBarChartOptions({
  yStepSize: 50,
  yAxisFormatter: (val) => `₹${val}k`,
});

const DailySalary = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
            <PaymentsIcon sx={{ fontSize: 22 }} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Daily Salary & Wage Distribution
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Daily wage expenses and overtime payout tracking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            Avg Daily: ₹1.68L
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

export default DailySalary;
