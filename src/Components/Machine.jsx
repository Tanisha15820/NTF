
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Pencil,
  Trash2,
  Cpu,
  Users,
  Activity,
  X,
} from "lucide-react";
import KPICards from "./KPICards";

const Machine = () => {

  /* -------------------------------------------------
     Sample machine data
     Replace this with your API/localStorage data later
  ------------------------------------------------- */
  const [machines, setMachines] = useState([
    {
      id: 1,
      name: "Machine 01",
      code: "M-001",
      type: "Loader",
      operators: 2,
      status: "Active",
    },
    {
      id: 2,
      name: "Machine 02",
      code: "M-002",
      type: "Monitor",
      operators: 1,
      status: "Active",
    },
    {
      id: 3,
      name: "Machine 03",
      code: "M-003",
      type: "Loader",
      operators: 2,
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "Loader",
    operators: 1,
    status: "Active",
  });

  /* -------------------------------------------------
     Filter machines
  ------------------------------------------------- */
  const filteredMachines = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return machines;

    return machines.filter((machine) =>
      [
        machine.name,
        machine.code,
        machine.type,
        machine.status,
      ].some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(value)
      )
    );
  }, [machines, search]);

  /* -------------------------------------------------
     Stats
  ------------------------------------------------- */
  const stats = useMemo(() => {
    const active = machines.filter(
      (machine) => machine.status === "Active"
    ).length;

    const operators = machines.reduce(
      (total, machine) =>
        total + (Number(machine.operators) || 0),
      0
    );

    return {
      total: machines.length,
      active,
      inactive: machines.length - active,
      operators,
    };
  }, [machines]);

  /* -------------------------------------------------
     Open Add Modal
  ------------------------------------------------- */
  const openAddModal = () => {
    setEditingMachine(null);

    setForm({
      name: "",
      code: "",
      type: "Loader",
      operators: 1,
      status: "Active",
    });

    setShowModal(true);
  };

  /* -------------------------------------------------
     Open Edit Modal
  ------------------------------------------------- */
  const openEditModal = (machine) => {
    setEditingMachine(machine);

    setForm({
      name: machine.name || "",
      code: machine.code || "",
      type: machine.type || "Loader",
      operators: machine.operators || 1,
      status: machine.status || "Active",
    });

    setShowModal(true);
  };

  /* -------------------------------------------------
     Save Machine
  ------------------------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (editingMachine) {
      setMachines((prev) =>
        prev.map((machine) =>
          machine.id === editingMachine.id
            ? {
                ...machine,
                ...form,
                operators: Number(form.operators) || 0,
              }
            : machine
        )
      );
    } else {
      const newMachine = {
        id: Date.now(),
        name: form.name.trim(),
        code: form.code.trim(),
        type: form.type,
        operators: Number(form.operators) || 0,
        status: form.status,
      };

      setMachines((prev) => [...prev, newMachine]);
    }

    setShowModal(false);
  };

  /* -------------------------------------------------
     Delete Machine
  ------------------------------------------------- */
  const handleDelete = (machine) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${machine.name}"?`
    );

    if (!confirmed) return;

    setMachines((prev) =>
      prev.filter((item) => item.id !== machine.id)
    );
  };

  /* -------------------------------------------------
     KPI data
  ------------------------------------------------- */
  const kpiData = [
    {
      title: "Total Machines",
      value: stats.total,
      color: "purple",
      icon: <Cpu size={20} />,
    },
    {
      title: "Active Machines",
      value: stats.active,
      color: "green",
      icon: <Activity size={20} />,
    },
    {
      title: "Inactive Machines",
      value: stats.inactive,
      color: "red",
      icon: <Cpu size={20} />,
    },
    {
      title: "Operators",
      value: stats.operators,
      color: "indigo",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fb] p-5 md:p-6">
      {/* =================================================
          TOP BAR
      ================================================= */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#26364d]">
            Machines
          </h1>

          <p className="mt-1 text-[13px] text-[#718096]">
            Manage machines assigned to this line.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#5A38D6]"
        >
          <Plus size={15} />
          Add Machine
        </button>
      </div>

      {/* =================================================
          KPI CARDS
      ================================================= */}
      <div className="mb-5">
        <KPICards data={kpiData} />
      </div>

      {/* =================================================
          MAIN TABLE CARD
      ================================================= */}
      <div className="overflow-hidden rounded-[14px] border border-[#e3e6eb] bg-white">
        {/* Table Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f3] px-5 py-4">
          <div>
            <h2 className="text-[14px] font-bold text-[#26364d]">
              Machines in this Line
            </h2>

            <p className="mt-0.5 text-xs text-[#718096]">
              {machines.length} machine
              {machines.length !== 1 ? "s" : ""} assigned
              to this line
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3af]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search machine..."
                className="h-9 w-[210px] rounded-lg border border-[#e1e5eb] bg-white pl-9 pr-3 text-xs text-[#344760] outline-none transition placeholder:text-[#a0a8b4] focus:border-[#6F4AE7] focus:ring-2 focus:ring-[#6F4AE7]/10"
              />
            </div>

            {/* Filter */}
            <button
              type="button"
              onClick={() =>
                setShowFilters((prev) => !prev)
              }
              className={`flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition ${
                showFilters
                  ? "border-[#6F4AE7] bg-[#f0ecff] text-[#6F4AE7]"
                  : "border-[#e1e5eb] text-[#596579] hover:bg-[#f7f8fb]"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2 border-b border-[#edf0f3] bg-[#fafbfc] px-5 py-3">
            <span className="text-xs font-semibold text-[#596579]">
              Machine Type:
            </span>

            <button
              type="button"
              className="rounded-full bg-[#f0ecff] px-3 py-1 text-[11px] font-semibold text-[#6F4AE7]"
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setSearch("Loader")}
              className="rounded-full border border-[#e3e6eb] bg-white px-3 py-1 text-[11px] font-medium text-[#596579] hover:border-[#6F4AE7] hover:text-[#6F4AE7]"
            >
              Loader
            </button>

            <button
              type="button"
              onClick={() => setSearch("Monitor")}
              className="rounded-full border border-[#e3e6eb] bg-white px-3 py-1 text-[11px] font-medium text-[#596579] hover:border-[#6F4AE7] hover:text-[#6F4AE7]"
            >
              Monitor
            </button>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="ml-auto text-xs font-semibold text-[#6F4AE7] hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto p-3">
          {filteredMachines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0ecff] text-[#6F4AE7]">
                <Cpu size={22} />
              </div>

              <h3 className="text-sm font-semibold text-[#344760]">
                No machines found
              </h3>

              <p className="mt-1 text-xs text-[#8a95a5]">
                {search
                  ? "Try changing your search."
                  : "Add a machine to this line."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openAddModal}
                  className="mt-3 text-xs font-semibold text-[#6F4AE7] hover:underline"
                >
                  + Add your first machine
                </button>
              )}
            </div>
          ) : (
            <table className="w-full min-w-[800px] border-collapse overflow-hidden rounded-lg">
              <thead>
                <tr className="bg-[#f5f6f8]">
                  <TableHeader>Machine Name</TableHeader>
                  <TableHeader>Code</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Operators</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>

              <tbody>
                {filteredMachines.map(
                  (machine, index) => (
                    <tr
                      key={`${machine.id}-${index}`}
                      className="border-b border-[#edf0f2] bg-white last:border-0 hover:bg-[#fafaff]"
                    >
                      {/* Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0ecff] text-[#6F4AE7]">
                            <Cpu size={16} />
                          </div>

                          <div>
                            <p className="text-[13px] font-semibold text-[#344760]">
                              {machine.name}
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#8a95a5]">
                              Machine #{index + 1}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Code */}
                      <TableCell>
                        {machine.code || "—"}
                      </TableCell>

                      {/* Type */}
                      <td className="border-r border-[#edf0f2] px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            machine.type
                              ?.toLowerCase() ===
                            "loader"
                              ? "bg-[#f0ecff] text-[#6F4AE7]"
                              : "bg-[#eef7ff] text-[#3182ce]"
                          }`}
                        >
                          {machine.type}
                        </span>
                      </td>

                      {/* Operators */}
                      <TableCell>
                        {machine.operators || 0}
                      </TableCell>

                      {/* Status */}
                      <td className="border-r border-[#edf0f2] px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
                            machine.status === "Active"
                              ? "text-[#16a34a]"
                              : "text-[#e74c3c]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              machine.status ===
                              "Active"
                                ? "bg-[#16a34a]"
                                : "bg-[#e74c3c]"
                            }`}
                          />

                          {machine.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(machine)
                            }
                            title="Edit Machine"
                            className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6F4AE7] transition hover:bg-[#e6dfff]"
                          >
                            <Pencil size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(machine)
                            }
                            title="Delete Machine"
                            className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
                          >
                            <Trash2 size={13} />
                          </button>

                          <button
                            type="button"
                            title="More"
                            className="flex h-[30px] w-[30px] items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#f5f6f8]"
                          >
                            <MoreHorizontal size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        {machines.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#edf0f3] px-5 py-3">
            <p className="text-xs text-[#718096]">
              Total Machines:{" "}
              <span className="font-semibold text-[#6F4AE7]">
                {machines.length}
              </span>
            </p>

            <p className="text-xs text-green-600">
              {stats.active} active machine
              {stats.active !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* =================================================
          ADD / EDIT MACHINE MODAL
      ================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[520px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#edf0f3] px-5 py-4">
              <div>
                <h2 className="text-[15px] font-bold text-[#26364d]">
                  {editingMachine
                    ? "Edit Machine"
                    : "Add Machine"}
                </h2>

                <p className="mt-0.5 text-xs text-[#8a95a5]">
                  {editingMachine
                    ? "Update machine details."
                    : "Add a new machine to this line."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#f5f6f8] hover:text-[#344760]"
              >
                <X size={17} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 px-5 py-5">
                {/* Machine Name */}
                <FormField label="Machine Name" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter machine name"
                    className="form-input"
                    required
                  />
                </FormField>

                {/* Code */}
                <FormField label="Machine Code">
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                    placeholder="e.g. M-001"
                    className="form-input"
                  />
                </FormField>

                {/* Type + Operators */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Machine Type">
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="form-input"
                    >
                      <option value="Loader">
                        Loader
                      </option>
                      <option value="Monitor">
                        Monitor
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </FormField>

                  <FormField label="Operators">
                    <input
                      type="number"
                      min="0"
                      value={form.operators}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          operators: e.target.value,
                        }))
                      }
                      className="form-input"
                    />
                  </FormField>
                </div>

                {/* Status */}
                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="form-input"
                  >
                    <option value="Active">
                      Active
                    </option>
                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </FormField>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 border-t border-[#edf0f3] bg-[#fafbfc] px-5 py-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-[#e1e5eb] bg-white px-4 py-2.5 text-xs font-semibold text-[#596579] transition hover:bg-[#f5f6f8]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#6F4AE7] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A38D6]"
                >
                  {editingMachine
                    ? "Save Changes"
                    : "Add Machine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* =====================================================
   TABLE HEADER
===================================================== */

const TableHeader = ({ children }) => {
  return (
    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#3b4b62] last:border-r-0">
      {children}
    </th>
  );
};

/* =====================================================
   TABLE CELL
===================================================== */

const TableCell = ({ children }) => {
  return (
    <td className="border-r border-[#edf0f2] px-4 py-3 text-[13px] font-medium text-[#44556c] last:border-r-0">
      {children}
    </td>
  );
};

/* =====================================================
   FORM FIELD
===================================================== */

const FormField = ({ label, required, children }) => {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-[#596579]">
        {label}
        {required && (
          <span className="ml-1 text-[#e74c3c]">*</span>
        )}
      </span>

      {children}
    </label>
  );
};

export default Machine;

