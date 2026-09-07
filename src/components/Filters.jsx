import { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const selectSx = {
  "& .MuiOutlinedInput-root": {
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontSize: "15px",
    color: "#475569",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D9E0E8",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C7D2FE",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#7C5CFC",
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    height: "44px",
    boxSizing: "border-box",
    padding: "0 40px 0 14px",
    fontSize: "15px",
  },

  "& .MuiSelect-icon": {
    right: "10px",
    color: "#64748B",
  },
};

const dateSx = {
  "& .MuiOutlinedInput-root": {
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontSize: "15px",
    color: "#475569",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D9E0E8",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C7D2FE",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#7C5CFC",
  },

  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#64748B",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#64748B",
  },

  "& .MuiOutlinedInput-input": {
    padding: "9px 12px",
    fontSize: "15px",
  },

  "& input::-webkit-calendar-picker-indicator": {
    cursor: "pointer",
  },
};

const menuProps = {
  PaperProps: {
    sx: {
      "& .MuiMenuItem-root": {
        fontSize: "15px",
        minHeight: "38px",
        padding: "9px 14px",
      },
    },
  },
};

const Filters = ({
  values: externalValues,
  onChange: externalOnChange,

  departmentOptions = ["Assembly", "Production", "Quality"],
  subDepartmentOptions = ["Sub 1", "Sub 2"],
  lineOptions = ["Line 1", "Line 2", "Line 3"],
  machineOptions = ["Machine 1", "Machine 2", "Machine 3"],

  machineLabel = "Shift",
  showDates = true,
}) => {
  const [internalValues, setInternalValues] = useState({
    department: "",
    subDepartment: "",
    line: "",
    machine: "",
    fromDate: "",
    toDate: "",
  });

  const values = externalValues ?? internalValues;

  const updateValue = (key) => (event) => {
    const nextValues = {
      ...values,
      [key]: event.target.value,
    };

    if (externalOnChange) {
      externalOnChange(nextValues);
    } else {
      setInternalValues(nextValues);
    }
  };

  return (
    <div className="mb-4 w-full rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      <div className="flex w-full flex-wrap items-center gap-3">
        {/* Filter */}
        <div className="flex h-[44px] shrink-0 items-center gap-2 px-1">
          <FilterAltOutlinedIcon
            sx={{
              fontSize: 22,
              color: "#334155",
            }}
          />

          <span className="whitespace-nowrap text-[15px] font-semibold text-[#334155]">
            Filters
          </span>
        </div>

        {/* Department */}
        <div className="w-full sm:w-[150px] lg:flex-1">
          <FormControl fullWidth size="small" sx={selectSx}>
            <Select
              value={values.department}
              displayEmpty
              onChange={updateValue("department")}
              MenuProps={menuProps}
              renderValue={(selected) => {
                if (!selected) {
                  return <span className="text-[#475569]">Department</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="">All Departments</MenuItem>
              {departmentOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Sub Department */}
        <div className="w-full sm:w-[175px] lg:flex-[1.15]">
          <FormControl fullWidth size="small" sx={selectSx}>
            <Select
              value={values.subDepartment}
              displayEmpty
              onChange={updateValue("subDepartment")}
              MenuProps={menuProps}
              renderValue={(selected) => {
                if (!selected) {
                  return <span className="text-[#475569]">Sub Department</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="">All Sub Departments</MenuItem>
              {subDepartmentOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Line */}
        <div className="w-full sm:w-[120px] lg:flex-[0.8]">
          <FormControl fullWidth size="small" sx={selectSx}>
            <Select
              value={values.line}
              displayEmpty
              onChange={updateValue("line")}
              MenuProps={menuProps}
              renderValue={(selected) => {
                if (!selected) {
                  return <span className="text-[#475569]">Line</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="">All Lines</MenuItem>
              {lineOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Shift */}
        <div className="w-full sm:w-[120px] lg:flex-[0.8]">
          <FormControl fullWidth size="small" sx={selectSx}>
            <Select
              value={values.machine}
              displayEmpty
              onChange={updateValue("machine")}
              MenuProps={menuProps}
              renderValue={(selected) => {
                if (!selected) {
                  return <span className="text-[#475569]">{machineLabel}</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="">All Shifts</MenuItem>
              {machineOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* From Date */}
        {showDates && (
          <>
            <div className="w-full sm:w-[150px] lg:flex-[0.9]">
              <TextField
                fullWidth
                size="small"
                label="From Date"
                type="date"
                value={values.fromDate}
                onChange={updateValue("fromDate")}
                sx={dateSx}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </div>

            {/* To Date */}
            <div className="w-full sm:w-[150px] lg:flex-[0.9]">
              <TextField
                fullWidth
                size="small"
                label="To Date"
                type="date"
                value={values.toDate}
                onChange={updateValue("toDate")}
                sx={dateSx}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Filters;
