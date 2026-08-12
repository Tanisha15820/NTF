import { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import TextField from "@mui/material/TextField";

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
      label: "Required",
      data: [45, 55, 40, 60, 50, 34, 60, 45, 55, 40, 60, 50, 34, 60, 55, 45],
      backgroundColor: "#aa6ba5",
      borderRadius: 0,
      borderSkipped: false,
      barThickness: 20,
    },
    {
      label: "Available",
      data: [30, 46, 24, 50, 40, 20, 45, 30, 46, 24, 50, 40, 20, 45, 46, 32],
      backgroundColor: "#5ca8ff",
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

const ManpowerAvailability = () => {
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [line, setLine] = useState("");
  const [shift, setShift] = useState("");

  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-10 rounded-xl bg-[#defbe7] flex items-center justify-center">
            <PeopleAltIcon
              sx={{
                color: "#42cf80",
                fontSize: 20,
              }}
            />
          </div>

          <div>
            <h1 className="text-sm font-bold text-gray-800">
              Manpower Availability Trend
            </h1>
            <p className="text-xs text-gray-500">
              Deployed headcount with day-over-day movement
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Filters
          </h2>

          <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
            <FormControl
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "32px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            >
              <InputLabel>Department</InputLabel>

              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        fontSize: "13px",
                        minHeight: "34px",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>

                <MenuItem value="Assembly">Assembly</MenuItem>
                <MenuItem value="Production">Production</MenuItem>
                <MenuItem value="Quality">Quality</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "32px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            >
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

            <FormControl
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "32px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            >
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

            <FormControl
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "32px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            >
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
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "32px", // Decrease height
                  borderRadius: "10px",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                  height: "32px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />

            <TextField
              fullWidth
              size="small"
              label="To Date"
              type="date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "32px",
                  borderRadius: "10px",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px",
                  height: "32px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
            />
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
    </div>
  );
};

export default ManpowerAvailability;
