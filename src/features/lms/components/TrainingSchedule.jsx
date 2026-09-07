import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EMPTY_PARTICIPANT = {
  name: "",
  department: "",
  designation: "",
};

const TrainingSchedule = () => {
  const [form, setForm] = useState({
    title: "",
    trainer: "",
    date: "",
    periodFrom: "",
    periodTo: "",
    type: "Internal",
    venue: "",
  });

  const [participants, setParticipants] = useState([{ ...EMPTY_PARTICIPANT }]);

  const handleFormChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleParticipantChange = (index, field) => (event) => {
    setParticipants((prev) =>
      prev.map((row, idx) =>
        idx === index ? { ...row, [field]: event.target.value } : row
      )
    );
  };

  const addParticipantRow = () => {
    setParticipants((prev) => [...prev, { ...EMPTY_PARTICIPANT }]);
  };

  const removeParticipantRow = (index) => {
    setParticipants((prev) =>
      prev.length === 1
        ? [{ ...EMPTY_PARTICIPANT }]
        : prev.filter((_, idx) => idx !== index)
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
              <CalendarTodayOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Training Schedule
              </h2>
              <p className="text-xs text-gray-500">
                Plan and manage the training programme for new manpower
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addParticipantRow}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#5F3ED1]"
          >
            <GroupsOutlinedIcon sx={{ fontSize: 18 }} />
            Add Participant
          </button>
        </div>

        {/* DOC REFERENCE */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 bg-gray-50/60 px-5 py-3">
          <p className="text-[12px] text-gray-600">
            <span className="font-semibold text-gray-700">Doc. No.:</span>{" "}
            F-05(AMD-02)
          </p>
          <p className="text-[12px] text-gray-600">
            <span className="font-semibold text-gray-700">Issue Date:</span>{" "}
            02.08.2014
          </p>
          <p className="text-[12px] text-gray-600">
            <span className="font-semibold text-gray-700">Rev. No.:</span> 00
          </p>
        </div>
      </div>

      {/* TRAINING DETAILS */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">
            Training Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
            <label className={labelClass}>Training Title / Subject</label>
            <input
              value={form.title}
              onChange={handleFormChange("title")}
              placeholder="Enter training title / subject"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label className={labelClass}>Name of Trainer</label>
            <input
              value={form.trainer}
              onChange={handleFormChange("trainer")}
              placeholder="Enter trainer name"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1"></div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={handleFormChange("date")}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Period (From)</label>
            <input
              type="time"
              value={form.periodFrom}
              onChange={handleFormChange("periodFrom")}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Period (To)</label>
            <input
              type="time"
              value={form.periodTo}
              onChange={handleFormChange("periodTo")}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Internal / External</label>
            <select
              value={form.type}
              onChange={handleFormChange("type")}
              className={inputClass}
            >
              <option value="Internal">Internal</option>
              <option value="External">External</option>
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className={labelClass}>Place / Venue</label>
            <input
              value={form.venue}
              onChange={handleFormChange("venue")}
              placeholder="Enter place / venue"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* INSTRUCTION */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-bold text-gray-900">Instruction</h3>
        <p className="text-xs leading-5 text-gray-600">
          Following employees are required to attend the above training
          Programme. Trainer, HOD &amp; participants are hereby informed to do
          the needful.
        </p>
      </div>

      {/* PARTICIPANTS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Participants Attendance
            </h3>
            <p className="text-xs text-gray-500">
              List the employees required to attend this training
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Total participants:{" "}
            <span className="font-semibold text-[#6F4AE7]">
              {participants.length}
            </span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="bg-gray-100/80">
                <th className="w-14 border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  S. No.
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Name of Participants
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Departments
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Designation
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Sign. HOD
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Sign. Participants
                </th>
                <th className="w-14 border-b border-gray-200 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  &nbsp;
                </th>
              </tr>
            </thead>

            <tbody>
              {participants.map((participant, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0 hover:bg-primary/5"
                >
                  <td className="border-r border-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border-r border-gray-100 px-4 py-2.5">
                    <input
                      value={participant.name}
                      onChange={handleParticipantChange(index, "name")}
                      placeholder="Participant name"
                      className={inputClass}
                    />
                  </td>
                  <td className="border-r border-gray-100 px-4 py-2.5">
                    <input
                      value={participant.department}
                      onChange={handleParticipantChange(index, "department")}
                      placeholder="Department"
                      className={inputClass}
                    />
                  </td>
                  <td className="border-r border-gray-100 px-4 py-2.5">
                    <input
                      value={participant.designation}
                      onChange={handleParticipantChange(index, "designation")}
                      placeholder="Designation"
                      className={inputClass}
                    />
                  </td>
                  <td className="border-r border-gray-100 px-4 py-2.5" />
                  <td className="border-r border-gray-100 px-4 py-2.5" />
                  <td className="px-4 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => removeParticipantRow(index)}
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
            Click row{" "}
            <span className="font-semibold text-[#6F4AE7]">+ Add Participant</span>{" "}
            to add more employees
          </p>

          <button
            type="button"
            onClick={addParticipantRow}
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

export default TrainingSchedule;
