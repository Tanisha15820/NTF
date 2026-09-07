import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Waypoints,
  Pencil,
  Trash2,
  Search,
  X,
  Plus,
} from "lucide-react";

const STORAGE_KEY = "lms_departments";

const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

const loadDepartments = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveDepartments = (next) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export default function Lines() {
  const navigate = useNavigate();
  const { deptId, subDeptId } = useParams();

  const [departments, setDepartments] = useState(loadDepartments);
  const [search, setSearch] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [lineForm, setLineForm] = useState({
    name: "",
    code: "",
    leaders: "",
    mentor: "",
    requirement: "",
    description: "",
  });

  const [editModal, setEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    code: "",
    leaders: "",
    mentor: "",
    requirement: "",
    description: "",
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const department = departments.find(
    (dept) => String(dept.id) === String(deptId),
  );

  const subDepartment = department?.subDepartments?.find(
    (subDept) => String(subDept.id) === String(subDeptId),
  );

  /* ===================== NOT FOUND ===================== */

  if (!department || !subDepartment) {
    return (
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-[#F5F7FB] text-[#26364d]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#f0ecff]">
            <Waypoints size={21} className="text-[#6F4AE7]" />
          </div>
          <h2 className="text-[15px] font-bold">Sub-Department not found</h2>
          <p className="mt-1 text-xs text-[#718096]">
            The selected sub-department could not be found.
          </p>
          <button
            onClick={() =>
              navigate(
                department
                  ? `/lms/subdepartment/${deptId}`
                  : "/lms/department",
              )
            }
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A38D6]"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    );
  }

  const lines = subDepartment.lines || [];

  /* ===================== DERIVED DATA ===================== */

  const orderedLines = lines
    .map((line, index) => ({ ...line, displayId: index + 1 }))
    .slice();

  const filteredLines = orderedLines.filter((line) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;

    return (
      String(line.displayId).includes(query) ||
      line.name.toLowerCase().includes(query) ||
      (line.code || "").toLowerCase().includes(query)
    );
  });

  const updateSubDepartment = (updater) => {
    const next = departments.map((dept) =>
      String(dept.id) === String(deptId)
        ? {
            ...dept,
            subDepartments: (dept.subDepartments || []).map((subDept) =>
              String(subDept.id) === String(subDeptId)
                ? updater(subDept)
                : subDept,
            ),
          }
        : dept,
    );

    setDepartments(next);
    saveDepartments(next);
  };

  /* ===================== ADD LINE ===================== */

  const openAddModal = () => {
    setLineForm({
      name: "",
      code: "",
      leaders: "",
      mentor: "",
      requirement: "",
      description: "",
    });
    setAddModal(true);
  };

  const saveLine = () => {
    const name = lineForm.name.trim();

    if (!name) {
      showToast("Please enter line name.");
      return;
    }

    const isDuplicate = lines.some(
      (line) => line.name.toLowerCase() === name.toLowerCase(),
    );

    if (isDuplicate) {
      showToast("Line already exists in this sub-department.");
      return;
    }

    updateSubDepartment((subDept) => ({
      ...subDept,
      lines: [
        ...(subDept.lines || []),
        {
          id: createId("line"),
          name,
          code: lineForm.code.trim(),
          leaders: lineForm.leaders.trim(),
          mentor: lineForm.mentor.trim(),
          requirement: lineForm.requirement.trim(),
          description: lineForm.description.trim(),
          machines: [],
        },
      ],
    }));

    showToast("Line added successfully.");
    setAddModal(false);
  };

  /* ===================== EDIT LINE ===================== */

  const openEditModal = (line) => {
    setEditTarget(line);
    setEditForm({
      name: line.name || "",
      code: line.code || "",
      leaders: line.leaders || "",
      mentor: line.mentor || "",
      requirement: line.requirement || "",
      description: line.description || "",
    });
    setEditModal(true);
  };

  const saveEdit = () => {
    if (!editTarget) return;

    const name = editForm.name.trim();

    if (!name) {
      showToast("Please enter line name.");
      return;
    }

    updateSubDepartment((subDept) => ({
      ...subDept,
      lines: (subDept.lines || []).map((line) =>
        line.id === editTarget.id
          ? {
              ...line,
              name,
              code: editForm.code.trim(),
              leaders: editForm.leaders.trim(),
              mentor: editForm.mentor.trim(),
              requirement: editForm.requirement.trim(),
              description: editForm.description.trim(),
            }
          : line,
      ),
    }));

    showToast("Line updated successfully.");
    setEditModal(false);
  };

  /* ===================== DELETE LINE ===================== */

  const askDelete = (line) => {
    setDeleteTarget(line);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    updateSubDepartment((subDept) => ({
      ...subDept,
      lines: (subDept.lines || []).filter((line) => line.id !== deleteTarget.id),
    }));

    showToast("Line deleted successfully.");
    setDeleteModal(false);
    setDeleteTarget(null);
  };

  /* ===================== RENDER ===================== */

  return (
    <div className="text-[#26364d]">
      <section className="p-4 sm:p-[30px_25px]">
        {/* BREADCRUMB */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-[#9aa3af]">
          <Link
            to="/lms/department"
            className="hover:text-[#6F4AE7] hover:underline"
          >
            Departments
          </Link>
          <span>/</span>
          <Link
            to={`/lms/subdepartment/${deptId}`}
            className="hover:text-[#6F4AE7] hover:underline"
          >
            {department.name}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#26364d]">
            {subDepartment.name}
          </span>
          <span>/</span>
          <span>Lines</span>
        </div>

        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* HEADER */}

          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6F4AE7] to-[#8b6ffe] text-white shadow-md shadow-[#6F4AE7]/30">
                <Waypoints size={21} />
              </div>
              <div className="min-w-0">
                <h1 className="text-[15px] font-bold">
                  Lines: {subDepartment.name}
                </h1>
                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage lines within this sub-department
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/lms/subdepartment/${deptId}`)}
                className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e3e6eb] bg-white px-4 text-xs font-semibold text-[#718096] transition hover:bg-[#f7f8fa] sm:flex-none"
              >
                <ArrowLeft size={15} />
                Back to Sub-Departments
              </button>

              <button
                onClick={openAddModal}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6c4ce8] to-[#8b6ffe] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#6c4ce8]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6c4ce8]/30 sm:flex-none"
              >
                <Plus size={15} />
                Add Line
              </button>
            </div>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5">
            <div className="rounded-[14px] border border-[#e3e6eb] bg-[#f7f8fa] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9aa3af]">
                Sub-Department Name
              </p>
              <p className="mt-1 text-lg font-bold text-[#6F4AE7]">
                {subDepartment.name}
              </p>
            </div>

            <div className="rounded-[14px] border border-[#e3e6eb] bg-[#f7f8fa] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9aa3af]">
                Lines Count
              </p>
              <p className="mt-1 text-2xl font-bold text-[#26364d]">
                {lines.length} Lines
              </p>
            </div>
          </div>

          {/* SEARCH */}

          <div className="flex flex-col gap-2 px-4 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="relative w-full sm:max-w-[340px]">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search lines..."
                className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] outline-none transition focus:border-[#6F4AE7] focus:bg-white"
              />
            </div>

            <p className="text-xs text-[#718096]">
              Showing{" "}
              <span className="font-semibold text-[#26364d]">
                {filteredLines.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#26364d]">
                {lines.length}
              </span>
            </p>
          </div>

          {/* TABLE */}

          <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="bg-[#f5f6f8]">
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      ID
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Line Name
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Machines
                    </th>
                    <th className="px-3 py-3 text-right text-[12px] font-bold uppercase text-[#3b4b62] sm:px-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLines.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                          <Waypoints size={42} className="mb-3 opacity-40" />
                          <p className="mb-4 text-sm">No lines found.</p>
                          <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
                          >
                            <Plus size={15} />
                            Add Line
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLines.map((line) => {
                      return (
                        <tr
                          key={line.id}
                          className="border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]"
                        >
                          <td className="border-r border-[#edf0f2] px-3 py-3 last:border-r-0 sm:px-4">
                            <span className="inline-flex rounded-full bg-[#f0ecff] px-2.5 py-1 text-[12px] font-semibold text-[#6F4AE7]">
                              #{line.displayId}
                            </span>
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] font-semibold text-[#344760] last:border-r-0 sm:px-4">
                            {line.name}
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 last:border-r-0 sm:px-4">
                            <span className="inline-flex rounded-full bg-[#eef7ff] px-2.5 py-1 text-[12px] font-semibold text-[#3182ce]">
                              {line.machines?.length || 0} Machines
                            </span>
                          </td>

                          <td className="px-3 py-3 sm:px-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/lms/machine/${deptId}/${subDeptId}/${line.id}`,
                                  )
                                }
                                className="flex items-center gap-1.5 rounded-full bg-[#f0ecff] px-3.5 py-2 text-xs font-semibold text-[#6F4AE7] transition hover:bg-[#e6dfff]"
                              >
                                Machines
                                <ArrowRight size={13} />
                              </button>

                              <button
                                title="Edit line"
                                onClick={() => openEditModal(line)}
                                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6F4AE7] transition hover:bg-[#e6dfff]"
                              >
                                <Pencil size={15} />
                              </button>

                              <button
                                title="Delete line"
                                onClick={() => askDelete(line)}
                                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ADD LINE MODAL */}

      {addModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAddModal(false);
          }}
        >
          <div className="max-h-full w-full max-w-[480px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <h2 className="text-base font-bold">Add Line</h2>
              <button
                onClick={() => setAddModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-xs font-semibold">
                Line Name
              </label>
              <input
                autoFocus
                value={lineForm.name}
                onChange={(event) =>
                  setLineForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                onKeyDown={(event) => event.key === "Enter" && saveLine()}
                placeholder="Enter line name"
                className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none focus:border-[#6F4AE7]"
              />

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setAddModal(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={saveLine}
                  className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT LINE MODAL */}

      {editModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditModal(false);
          }}
        >
          <div className="max-h-full w-full max-w-[480px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <h2 className="text-base font-bold">Edit Line</h2>
              <button
                onClick={() => setEditModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-xs font-semibold">
                Line Name
              </label>
              <input
                autoFocus
                value={editForm.name}
                onChange={(event) =>
                  setEditForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                onKeyDown={(event) => event.key === "Enter" && saveEdit()}
                placeholder="Enter line name"
                className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none focus:border-[#6F4AE7]"
              />

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setEditModal(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDeleteModal(false);
          }}
        >
          <div className="max-h-full w-full max-w-[480px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <h2 className="text-base font-bold">Confirm Delete</h2>
              <button
                onClick={() => setDeleteModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-gray-600">
                Are you sure you want to delete{" "}
                <strong className="text-gray-900">"{deleteTarget?.name}"</strong>
                ? This will also remove all of its machines.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded-lg bg-[#fff0ee] px-4 py-2.5 text-xs font-semibold text-[#e74c3c]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#10b981] bg-[#202938] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
}