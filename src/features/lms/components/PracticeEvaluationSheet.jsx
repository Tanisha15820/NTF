import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ScoreboardOutlinedIcon from "@mui/icons-material/ScoreboardOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EMPTY_ROW = {
  partName: "",
  tactTime: "",
  actualTime: "",
  trial: "",
  ok: "",
  ng: "",
  status: "Pending",
};

const PracticeEvaluationSheet = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    type: "",
  });

  const [rows, setRows] = useState([{ ...EMPTY_ROW }]);

  const handleFormChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleRowChange = (index, field) => (event) => {
    setRows((prev) =>
      prev.map((row, idx) =>
        idx === index ? { ...row, [field]: event.target.value } : row
      )
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, { ...EMPTY_ROW }]);
  };

  const removeRow = (index) => {
    setRows((prev) =>
      prev.length === 1 ? [{ ...EMPTY_ROW }] : prev.filter((_, idx) => idx !== index)
    );
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-[#6F4AE7] focus:ring-2 focus:ring-[#6F4AE7]/10";

  const labelClass = "mb-1.5 block text-[11px] font-semibold text-gray-600";

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light to-primary-dark shadow-sm">
              <ScoreboardOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Practice Evaluation Sheet
              </h2>
              <p className="text-xs text-gray-500">
                Record and evaluate hands-on practice performance of trainees
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addRow}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#5F3ED1]"
          >
            <AddOutlinedIcon sx={{ fontSize: 18 }} />
            Add Evaluation Row
          </button>
        </div>
      </div>

      {/* EVALUATION DETAILS */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <EditNoteOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Evaluation Details</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Name</label>
            <input
              value={form.name}
              onChange={handleFormChange("name")}
              placeholder="Enter participant name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={handleFormChange("date")}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Type</label>
            <input
              value={form.type}
              onChange={handleFormChange("type")}
              placeholder="e.g. CNC / VMC / Manual"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* EVALUATION TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Evaluation Entries</h3>
            <p className="text-xs text-gray-500">
              List the parts / processes practised during the session
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Total entries:{" "}
            <span className="font-semibold text-[#6F4AE7]">{rows.length}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-gray-100/80">
                <th className="w-14 border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  S. No.
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Part Name / Process Name
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Tact Time / Sec.
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Actual Time / Sec.
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Process Name / Trial (Operator)
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  OK
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  NG
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Status
                </th>
                <th className="w-14 border-b border-gray-200 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  &nbsp;
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0 hover:bg-primary/5"
                >
                  <td className="border-r border-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-700">
                    {index + 1}
                  </td>

                  {[
                    ["partName", "Part name"],
                    ["tactTime", "Tact time"],
                    ["actualTime", "Actual time"],
                    ["trial", "Trial / operator"],
                  ].map(([field, placeholder]) => (
                    <td
                      key={field}
                      className="border-r border-gray-100 px-4 py-2.5"
                    >
                      <input
                        value={row[field]}
                        onChange={handleRowChange(index, field)}
                        placeholder={placeholder}
                        className={inputClass}
                      />
                    </td>
                  ))}

                  <td className="border-r border-gray-100 px-4 py-2.5 text-center">
                    <input
                      value={row.ok}
                      onChange={handleRowChange(index, "ok")}
                      placeholder="—"
                      className={`${inputClass} w-14 text-center`}
                    />
                  </td>

                  <td className="border-r border-gray-100 px-4 py-2.5 text-center">
                    <input
                      value={row.ng}
                      onChange={handleRowChange(index, "ng")}
                      placeholder="—"
                      className={`${inputClass} w-14 text-center`}
                    />
                  </td>

                  <td className="border-r border-gray-100 px-4 py-2.5">
                    <select
                      value={row.status}
                      onChange={handleRowChange(index, "status")}
                      className={inputClass}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </td>

                  <td className="px-4 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      title="Remove row"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <p className="text-xs text-gray-500">
            Mark each trial as{" "}
            <span className="font-semibold text-emerald-500">OK</span> /{" "}
            <span className="font-semibold text-red-500">NG</span> and update the
            status
          </p>

          <button
            type="button"
            onClick={addRow}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#E5E7EB] px-4 text-xs font-semibold text-[#6F4AE7] transition hover:border-[#6F4AE7] hover:bg-[#6F4AE7]/5"
          >
            <AddOutlinedIcon sx={{ fontSize: 18 }} />
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeEvaluationSheet;