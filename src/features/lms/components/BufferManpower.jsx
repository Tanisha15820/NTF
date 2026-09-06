import { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
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
      label: "Required",
      data: [45, 55, 40, 60, 50, 34, 60, 45, 55, 40, 60, 50, 34, 60, 55, 45],
      color: CHART_COLORS.primary,
      borderRadius: 0,
      barThickness: 24,
    }),
    createBarDataset({
      label: "Buffer Available",
      data: [30, 46, 24, 50, 40, 20, 45, 30, 46, 24, 50, 40, 20, 45, 46, 32],
      color: CHART_COLORS.teal,
      borderRadius: 0,
      barThickness: 24,
    }),
  ],
};

const options = getBarChartOptions({
  yStepSize: 20,
});

const filterInputSx = {
  "& .MuiOutlinedInput-root": {
    height: "36px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontSize: "13px",
    color: "#334155",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C7D2FE",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6F4AE7",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "13px",
    color: "#64748B",
    lineHeight: "1.2",
    "&.Mui-focused": {
      color: "#6F4AE7",
    },
  },
  "& .MuiSelect-select": {
    padding: "7px 12px",
    fontSize: "13px",
  },
};

const BufferManpower = () => {
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [line, setLine] = useState("");
  const [shift, setShift] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 transition-all duration-300 hover:shadow-md h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shadow-xs">
              <PeopleAltIcon sx={{ fontSize: 22 }} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Buffer Manpower Trend
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Deployed headcount with day-over-day movement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-100">
              Buffer Pool: 18.5%
            </span>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="bg-slate-50/70 rounded-xl p-3 mb-4 border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            <FormControl fullWidth size="small" sx={filterInputSx}>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Assembly">Assembly</MenuItem>
                <MenuItem value="Production">Production</MenuItem>
                <MenuItem value="Quality">Quality</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={filterInputSx}>
              <InputLabel>Sub Department</InputLabel>
              <Select
                value={subDepartment}
                label="Sub Department"
                onChange={(e) => setSubDepartment(e.target.value)}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Sub 1">Sub 1</MenuItem>
                <MenuItem value="Sub 2">Sub 2</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={filterInputSx}>
              <InputLabel>Line</InputLabel>
              <Select
                value={line}
                label="Line"
                onChange={(e) => setLine(e.target.value)}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Line 1">Line 1</MenuItem>
                <MenuItem value="Line 2">Line 2</MenuItem>
                <MenuItem value="Line 3">Line 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={filterInputSx}>
              <InputLabel>Shift</InputLabel>
              <Select
                value={shift}
                label="Shift"
                onChange={(e) => setShift(e.target.value)}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
                <MenuItem value="Night">Night</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="From Date"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={{
                ...filterInputSx,
                "& .MuiOutlinedInput-input": {
                  padding: "7px 12px",
                  fontSize: "13px",
                },
              }}
            />

            <TextField
              fullWidth
              size="small"
              label="To Date"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={{
                ...filterInputSx,
                "& .MuiOutlinedInput-input": {
                  padding: "7px 12px",
                  fontSize: "13px",
                },
              }}
            />
          </div>
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

export default BufferManpower;
