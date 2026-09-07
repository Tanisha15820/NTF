// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Building2, CirclePlus, Pencil, Search, Trash2, X } from "lucide-react";
// import Filters from "../../../components/Filters";

// const STORAGE_KEY = "lms_departments";

// const EDIT_LEVELS = [
//   { key: "department", label: "Department" },
//   { key: "section", label: "Section" },
//   { key: "line", label: "Line" },
//   { key: "subSection", label: "Sub-section" },
//   { key: "machine", label: "Machine" },
// ];

// const createId = (prefix) =>
//   `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

// const loadDepartments = () => {
//   try {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//   } catch {
//     return [];
//   }
// };

// const getRowId = (row) =>
//   [
//     row.department?.id,
//     row.section?.id || "",
//     row.line?.id || "",
//     row.subSection?.id || "",
//     row.machine?.id || "",
//   ].join("-");

// const buildRows = (departments) => {
//   const rows = [];

//   departments.forEach((department) => {
//     const base = {
//       department,
//       section: null,
//       line: null,
//       subSection: null,
//       machine: null,
//     };

//     if (!department.sections?.length) {
//       rows.push(base);
//       return;
//     }

//     department.sections.forEach((section) => {
//       const row = { ...base, section };

//       if (!section.lines?.length) {
//         rows.push(row);
//         return;
//       }

//       section.lines.forEach((line) => {
//         const rowWithLine = { ...row, line };

//         if (!line.subSections?.length) {
//           rows.push(rowWithLine);
//           return;
//         }

//         line.subSections.forEach((subSection) => {
//           const rowWithSubSection = { ...rowWithLine, subSection };

//           if (!subSection.machines?.length) {
//             rows.push(rowWithSubSection);
//             return;
//           }

//           subSection.machines.forEach((machine) => {
//             rows.push({ ...rowWithSubSection, machine });
//           });
//         });
//       });
//     });
//   });

//   return rows;
// };

// export default function Department() {
//   const navigate = useNavigate();

//   const [departments, setDepartments] = useState(loadDepartments);
//   const [search, setSearch] = useState("");
//   const [filterValues, setFilterValues] = useState({
//     department: "",
//     subDepartment: "",
//     line: "",
//     machine: "",
//   });

//   const [addModal, setAddModal] = useState(false);
//   const [departmentName, setDepartmentName] = useState("");
//   const [editModal, setEditModal] = useState(false);
//   const [editingRow, setEditingRow] = useState(null);
//   const [editSessions, setEditSessions] = useState({});
//   const [editSteps, setEditSteps] = useState({});
//   const [editValue, setEditValue] = useState("");
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [toast, setToast] = useState("");

//   const showToast = (message) => {
//     setToast(message);

//     setTimeout(() => {
//       setToast("");
//     }, 2500);
//   };

//   /* ===================== TABLE DATA ===================== */

//   const rows = buildRows(departments);

//   const tableRows = rows.filter((row) => {
//     const query = search.toLowerCase();

//     const text = [
//       row.department?.name,
//       row.section?.name,
//       row.line?.name,
//       row.subSection?.name,
//       row.machine?.name,
//     ]
//       .filter(Boolean)
//       .join(" ")
//       .toLowerCase();

//     const matchesSearch = !query || text.includes(query);
//     const matchesDepartment =
//       !filterValues.department || row.department?.name === filterValues.department;
//     const matchesSection =
//       !filterValues.subDepartment || row.section?.name === filterValues.subDepartment;
//     const matchesLine = !filterValues.line || row.line?.name === filterValues.line;
//     const matchesMachine =
//       !filterValues.machine || row.machine?.name === filterValues.machine;

//     return (
//       matchesSearch &&
//       matchesDepartment &&
//       matchesSection &&
//       matchesLine &&
//       matchesMachine
//     );
//   });

//   const unique = (list) => [...new Set(list.filter(Boolean))];

//   const filterOptions = {
//     departments: unique(departments.map((department) => department.name)),
//     sections: unique(rows.map((row) => row.section?.name)),
//     lines: unique(rows.map((row) => row.line?.name)),
//     machines: unique(rows.map((row) => row.machine?.name)),
//   };

//   /* ===================== ADD DEPARTMENT ===================== */

//   const openAddModal = () => {
//     setDepartmentName("");
//     setAddModal(true);
//   };

//   const saveDepartment = () => {
//     const name = departmentName.trim();

//     if (!name) {
//       showToast("Please enter department name.");
//       return;
//     }

//     const isDuplicate = departments.some(
//       (department) => department.name.toLowerCase() === name.toLowerCase(),
//     );

//     if (isDuplicate) {
//       showToast("Department already exists.");
//       return;
//     }

//     const next = [
//       ...departments,
//       { id: createId("department"), name, sections: [] },
//     ];

//     setDepartments(next);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
//     showToast("Department added successfully.");
//     setAddModal(false);
//   };

//   /* ===================== EDIT (WIZARD FLOW) ===================== */

//   // Returns the name shown in the edit input for the current step.
//   const getCurrentValue = (session, stepIndex) => {
//     const department = departments.find((d) => d.id === session.departmentId);

//     if (!department) return "";

//     if (stepIndex === 0) return department.name;

//     const section = department.sections?.find(
//       (s) => s.id === session.sectionId,
//     );

//     if (stepIndex === 1) return section?.name || "";

//     const line = section?.lines?.find((l) => l.id === session.lineId);

//     if (stepIndex === 2) return line?.name || "";

//     const subSection = line?.subSections?.find(
//       (s) => s.id === session.subSectionId,
//     );

//     if (stepIndex === 3) return subSection?.name || "";

//     const machine = subSection?.machines?.find((m) => m.id === session.machineId);

//     if (stepIndex === 4) return machine?.name || "";

//     return "";
//   };

//   const openEdit = (row) => {
//     const rowId = getRowId(row);

//     let session = editSessions[rowId];
//     let stepIndex = editSteps[rowId];

//     if (!session) {
//       session = {
//         rowId,
//         departmentId: row.department?.id,
//         sectionId: row.section?.id || null,
//         lineId: row.line?.id || null,
//         subSectionId: row.subSection?.id || null,
//         machineId: row.machine?.id || null,
//       };

//       // Editing starts at the first level that is still empty in the row.
//       if (!row.section) stepIndex = 1;
//       else if (!row.line) stepIndex = 2;
//       else if (!row.subSection) stepIndex = 3;
//       else if (!row.machine) stepIndex = 4;
//       else stepIndex = 0;
//     }

//     setEditingRow(row);
//     setEditSessions((prev) => ({ ...prev, [rowId]: session }));
//     setEditSteps((prev) => ({ ...prev, [rowId]: stepIndex }));
//     setEditValue(getCurrentValue(session, stepIndex));
//     setEditModal(true);
//   };

//   const saveEdit = () => {
//     if (!editingRow) return;

//     const rowId = getRowId(editingRow);
//     const session = editSessions[rowId];
//     const stepIndex = editSteps[rowId];

//     if (!session) return;

//     const level = EDIT_LEVELS[stepIndex];
//     const value = editValue.trim();

//     if (!value) {
//       showToast(`Please enter ${level.label.toLowerCase()} name.`);
//       return;
//     }

//     const idKey = `${level.key}Id`;
//     const currentId = session[idKey];
//     const isNew = stepIndex > 0 && !currentId;
//     const newId = isNew ? createId(level.key) : currentId;
//     const next = structuredClone(departments);
//     const department = next.find((d) => d.id === session.departmentId);

//     if (department) {
//       if (stepIndex === 0) {
//         department.name = value;
//       } else if (stepIndex === 1) {
//         if (currentId) {
//           const section = department.sections?.find((s) => s.id === currentId);
//           if (section) section.name = value;
//         } else {
//           if (!department.sections) department.sections = [];
//           department.sections.push({ id: newId, name: value, lines: [] });
//         }
//       } else if (stepIndex === 2) {
//         const section = department.sections?.find(
//           (s) => s.id === session.sectionId,
//         );
//         if (section) {
//           if (currentId) {
//             const line = section.lines?.find((l) => l.id === currentId);
//             if (line) line.name = value;
//           } else {
//             if (!section.lines) section.lines = [];
//             section.lines.push({ id: newId, name: value, subSections: [] });
//           }
//         }
//       } else if (stepIndex === 3) {
//         const section = department.sections?.find(
//           (s) => s.id === session.sectionId,
//         );
//         const line = section?.lines?.find((l) => l.id === session.lineId);
//         if (line) {
//           if (currentId) {
//             const subSection = line.subSections?.find(
//               (s) => s.id === currentId,
//             );
//             if (subSection) subSection.name = value;
//           } else {
//             if (!line.subSections) line.subSections = [];
//             line.subSections.push({ id: newId, name: value, machines: [] });
//           }
//         }
//       } else if (stepIndex === 4) {
//         const section = department.sections?.find(
//           (s) => s.id === session.sectionId,
//         );
//         const line = section?.lines?.find((l) => l.id === session.lineId);
//         const subSection = line?.subSections?.find(
//           (s) => s.id === session.subSectionId,
//         );
//         if (subSection) {
//           if (currentId) {
//             const machine = subSection.machines?.find((m) => m.id === currentId);
//             if (machine) machine.name = value;
//           } else {
//             if (!subSection.machines) subSection.machines = [];
//             subSection.machines.push({ id: newId, name: value });
//           }
//         }
//       }
//     }

//     setDepartments(next);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

//     // Remember the progress so the next edit continues from the next step.
//     setEditSessions((prev) => ({
//       ...prev,
//       [rowId]: { ...session, [idKey]: newId },
//     }));
//     setEditSteps((prev) => ({
//       ...prev,
//       [rowId]: Math.min(stepIndex + 1, EDIT_LEVELS.length - 1),
//     }));

//     showToast(`${level.label} ${isNew ? "added" : "updated"} successfully.`);
//     setEditModal(false);
//   };

//   // The level currently being edited (used by the edit modal).
//   const currentSession = editingRow ? editSessions[getRowId(editingRow)] : null;
//   const currentStep = editingRow ? editSteps[getRowId(editingRow)] : 0;
//   const currentLevel = currentSession ? EDIT_LEVELS[currentStep] : null;

//   /* ===================== DELETE ===================== */

//   const askDelete = (department) => {
//     setDeleteTarget(department);
//     setDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     if (!deleteTarget) return;

//     const next = departments.filter(
//       (department) => department.id !== deleteTarget.id,
//     );

//     setDepartments(next);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
//     showToast("Department deleted successfully.");
//     setDeleteModal(false);
//     setDeleteTarget(null);
//   };

//   /* ===================== RENDER ===================== */

//   return (
//     <div className="text-[#26364d]">
//       <section className="p-4 sm:p-[30px_25px]">
//         <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
//           {/* HEADER */}

//           <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
//             <div className="flex items-center gap-3">
//               <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-[#6F4AE7] text-white">
//                 <Building2 size={21} />
//               </div>

//               <div className="min-w-0">
//                 <h1 className="text-[15px] font-bold">Departments</h1>

//                 <p className="mt-0.5 text-xs text-[#718096]">
//                   Manage departments and their complete hierarchy
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={openAddModal}
//               className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A38D6] sm:w-auto"
//             >
//               <CirclePlus size={16} />
//               Add Department
//             </button>
//           </div>

//           {/* FILTERS */}

//           <div className="m-4 sm:m-5">
//             <Filters
//               values={filterValues}
//               onChange={setFilterValues}
//               departmentOptions={filterOptions.departments}
//               subDepartmentOptions={filterOptions.sections}
//               lineOptions={filterOptions.lines}
//               machineOptions={filterOptions.machines}
//               machineLabel="Machine"
//               showDates={true}
//             />
//           </div>

//           {/* TABLE */}

//           <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
//             <div className="flex flex-col gap-3 border-b border-[#edf0f3] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
//               <div>
//                 <h3 className="text-[15px] font-bold text-[#26364d]">
//                   Department
//                 </h3>
//               </div>

//               <div className="relative w-full sm:w-auto sm:max-w-[300px]">
//                 <Search
//                   size={15}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <input
//                   value={search}
//                   onChange={(event) => setSearch(event.target.value)}
//                   placeholder="Search..."
//                   className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] outline-none transition focus:border-[#6F4AE7] focus:bg-white"
//                 />
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1050px] border-collapse">
//                 <thead>
//                   <tr className="bg-[#f5f6f8]">
//                     <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
//                       Department
//                     </th>
//                     <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
//                       Section
//                     </th>
//                     <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
//                       Line
//                     </th>
//                     <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
//                       Sub-section
//                     </th>
//                     <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
//                       Machine
//                     </th>
//                     <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {tableRows.length === 0 ? (
//                     <tr>
//                       <td colSpan={6} className="p-0">
//                         <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//                           <Building2 size={42} className="mb-3 opacity-40" />

//                           <p className="mb-4 text-sm">No departments found.</p>

//                           <button
//                             onClick={openAddModal}
//                             className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
//                           >
//                             <CirclePlus size={15} />
//                             Add Department
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     tableRows.map((row, index) => (
//                       <tr
//                         key={`${row.department.id}-${index}`}
//                         className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]"
//                       >
//                         <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               navigate(`/lms/section/${row.department.id}`)
//                             }
//                             className="font-semibold text-[#344760] transition hover:text-[#6F4AE7] hover:underline"
//                           >
//                             {row.department.name}
//                           </button>
//                         </td>

//                         <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
//                           {row.section?.name || "-"}
//                         </td>

//                         <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
//                           {row.line?.name || "-"}
//                         </td>

//                         <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
//                           {row.subSection?.name || "-"}
//                         </td>

//                         <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
//                           {row.machine?.name || "-"}
//                         </td>

//                         <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
//                           <div className="flex gap-2">
//                             <button
//                               title="Edit department"
//                               onClick={() => openEdit(row)}
//                               className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6F4AE7] transition hover:bg-[#e6dfff]"
//                             >
//                               <Pencil size={15} />
//                             </button>

//                             <button
//                               title="Delete department"
//                               onClick={() => askDelete(row.department)}
//                               className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
//                             >
//                               <Trash2 size={15} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ADD DEPARTMENT MODAL */}

//       {addModal && (
//         <div
//           className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) {
//               setAddModal(false);
//             }
//           }}
//         >
//           <div className="max-h-full w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
//             <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
//               <h2 className="text-base font-bold">Add Department</h2>

//               <button
//                 onClick={() => setAddModal(false)}
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 <X size={21} />
//               </button>
//             </div>

//             <div className="max-h-[65vh] overflow-y-auto p-5">
//               <div className="space-y-5">
//                 <div>
//                   <label className="mb-2 block text-xs font-semibold">
//                     Department Name
//                   </label>

//                   <input
//                     autoFocus
//                     value={departmentName}
//                     onChange={(event) => setDepartmentName(event.target.value)}
//                     onKeyDown={(event) => {
//                       if (event.key === "Enter") {
//                         saveDepartment();
//                       }
//                     }}
//                     placeholder="Enter department name"
//                     className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none focus:border-[#6F4AE7]"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
//                 <button
//                   onClick={() => setAddModal(false)}
//                   className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={saveDepartment}
//                   className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* EDIT MODAL */}

//       {editModal && (
//         <div
//           className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) {
//               setEditModal(false);
//             }
//           }}
//         >
//           <div className="max-h-full w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
//             <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
//               <h2 className="text-base font-bold">
//                 {currentSession ? `Edit ${currentLevel?.label || ""} Name` : "Edit"}
//               </h2>

//               <button
//                 onClick={() => setEditModal(false)}
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 <X size={21} />
//               </button>
//             </div>

//             <div className="max-h-[65vh] overflow-y-auto p-5">
//               <div className="space-y-5">
//                 <div>
//                   <label className="mb-2 block text-xs font-semibold">
//                     {currentLevel?.label} Name
//                   </label>

//                   <input
//                     autoFocus
//                     value={editValue}
//                     onChange={(event) => setEditValue(event.target.value)}
//                     onKeyDown={(event) => {
//                       if (event.key === "Enter") {
//                         saveEdit();
//                       }
//                     }}
//                     placeholder={`Enter ${currentLevel?.label || ""} name`}
//                     className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none focus:border-[#6F4AE7]"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
//                 <button
//                   onClick={() => setEditModal(false)}
//                   className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={saveEdit}
//                   className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DELETE MODAL */}

//       {deleteModal && (
//         <div
//           className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) {
//               setDeleteModal(false);
//             }
//           }}
//         >
//           <div className="max-h-full w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
//             <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
//               <h2 className="text-base font-bold">Confirm Delete</h2>

//               <button
//                 onClick={() => setDeleteModal(false)}
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 <X size={21} />
//               </button>
//             </div>

//             <div className="max-h-[65vh] overflow-y-auto p-5">
//               <div className="text-sm leading-6 text-gray-600">
//                 Are you sure you want to delete{" "}
//                 <strong className="text-gray-900">
//                   "{deleteTarget?.name}"
//                 </strong>
//                 ?
//               </div>

//               <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
//                 <button
//                   onClick={() => setDeleteModal(false)}
//                   className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={confirmDelete}
//                   className="rounded-lg bg-[#fff0ee] px-4 py-2.5 text-xs font-semibold text-[#e74c3c]"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* TOAST */}

//       {toast && (
//         <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#10b981] bg-[#202938] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
//           {toast}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  CirclePlus,
  Pencil,
  Trash2,
  Search,
  X,
  ArrowRight,
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

export default function Department() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState(loadDepartments);
  const [search, setSearch] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [departmentName, setDepartmentName] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editName, setEditName] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  /* ===================== DERIVED DATA ===================== */

  // Oldest first, keeping a stable display number (#N) tied to
  // the order departments were originally created in.
  const orderedDepartments = departments
    .map((department, index) => ({ ...department, displayId: index + 1 }))
    .slice();

  const filteredDepartments = orderedDepartments.filter((department) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;

    return (
      String(department.displayId).includes(query) ||
      department.name.toLowerCase().includes(query)
    );
  });

  const totalSubDepartments = departments.reduce(
    (total, department) => total + (department.subDepartments?.length || 0),
    0,
  );

  /* ===================== ADD DEPARTMENT ===================== */

  const openAddModal = () => {
    setDepartmentName("");
    setAddModal(true);
  };

  const saveDepartment = () => {
    const name = departmentName.trim();

    if (!name) {
      showToast("Please enter department name.");
      return;
    }

    const isDuplicate = departments.some(
      (department) => department.name.toLowerCase() === name.toLowerCase(),
    );

    if (isDuplicate) {
      showToast("Department already exists.");
      return;
    }

    const next = [
      ...departments,
      { id: createId("department"), name, subDepartments: [] },
    ];

    setDepartments(next);
    saveDepartments(next);
    showToast("Department added successfully.");
    setAddModal(false);
  };

  /* ===================== EDIT DEPARTMENT ===================== */

  const openEditModal = (department) => {
    setEditTarget(department);
    setEditName(department.name);
    setEditModal(true);
  };

  const saveEdit = () => {
    if (!editTarget) return;

    const name = editName.trim();

    if (!name) {
      showToast("Please enter department name.");
      return;
    }

    const next = departments.map((department) =>
      department.id === editTarget.id ? { ...department, name } : department,
    );

    setDepartments(next);
    saveDepartments(next);
    showToast("Department updated successfully.");
    setEditModal(false);
  };

  /* ===================== DELETE DEPARTMENT ===================== */

  const askDelete = (department) => {
    setDeleteTarget(department);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    const next = departments.filter(
      (department) => department.id !== deleteTarget.id,
    );

    setDepartments(next);
    saveDepartments(next);
    showToast("Department deleted successfully.");
    setDeleteModal(false);
    setDeleteTarget(null);
  };

  /* ===================== RENDER ===================== */

  return (
    <div className="text-[#26364d]">
      <section className="p-4 sm:p-[30px_25px]">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* HEADER */}

          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-[#6F4AE7] text-white">
                <Building2 size={21} />
              </div>

              <div className="min-w-0">
                <h1 className="text-[15px] font-bold">Department Management</h1>
                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage departments and drill into their sub-departments
                </p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6c4ce8] to-[#8b6ffe] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#6c4ce8]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6c4ce8]/30 sm:w-auto"
            >
              <CirclePlus size={16} />
              Add Department
            </button>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5">
            <div className="rounded-[14px] border border-[#e3e6eb] bg-[#f7f8fa] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9aa3af]">
                Total Departments
              </p>
              <p className="mt-1 text-2xl font-bold text-[#26364d]">
                {departments.length}
              </p>
            </div>

            <div className="rounded-[14px] border border-[#e3e6eb] bg-[#f7f8fa] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9aa3af]">
                Total Sub-Departments
              </p>
              <p className="mt-1 text-2xl font-bold text-[#6F4AE7]">
                {totalSubDepartments} Sub-Depts
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
                placeholder="Search by ID or department name..."
                className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] outline-none transition focus:border-[#6F4AE7] focus:bg-white"
              />
            </div>

            <p className="text-xs text-[#718096]">
              Showing{" "}
              <span className="font-semibold text-[#26364d]">
                {filteredDepartments.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#26364d]">
                {departments.length}
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
                      Department Name
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Sub-Departments
                    </th>
                    <th className="px-3 py-3 text-right text-[12px] font-bold uppercase text-[#3b4b62] sm:px-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDepartments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                          <Building2 size={42} className="mb-3 opacity-40" />
                          <p className="mb-4 text-sm">No departments found.</p>
                          <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
                          >
                            <CirclePlus size={15} />
                            Add Department
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredDepartments.map((department) => (
                      <tr
                        key={department.id}
                        className="border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]"
                      >
                        <td className="border-r border-[#edf0f2] px-3 py-3 last:border-r-0 sm:px-4">
                          <span className="inline-flex rounded-full bg-[#f0ecff] px-2.5 py-1 text-[12px] font-semibold text-[#6F4AE7]">
                            #{department.displayId}
                          </span>
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] font-semibold text-[#344760] last:border-r-0 sm:px-4">
                          {department.name}
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 last:border-r-0 sm:px-4">
                          <span className="inline-flex rounded-full bg-[#eef7ff] px-2.5 py-1 text-[12px] font-semibold text-[#3182ce]">
                            {department.subDepartments?.length || 0} Sub-Depts
                          </span>
                        </td>

                        <td className="px-3 py-3 sm:px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                navigate(`/lms/subdepartment/${department.id}`)
                              }
                              className="flex items-center gap-1.5 rounded-full bg-[#f0ecff] px-3.5 py-2 text-xs font-semibold text-[#6F4AE7] transition hover:bg-[#e6dfff]"
                            >
                              Sub-Departments
                              <ArrowRight size={13} />
                            </button>

                            <button
                              title="Edit department"
                              onClick={() => openEditModal(department)}
                              className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6F4AE7] transition hover:bg-[#e6dfff]"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              title="Delete department"
                              onClick={() => askDelete(department)}
                              className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ADD DEPARTMENT MODAL */}

      {addModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAddModal(false);
          }}
        >
          <div className="max-h-full w-full max-w-[480px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <h2 className="text-base font-bold">Add Department</h2>
              <button
                onClick={() => setAddModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-xs font-semibold">
                Department Name
              </label>
              <input
                autoFocus
                value={departmentName}
                onChange={(event) => setDepartmentName(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && saveDepartment()}
                placeholder="Enter department name"
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
                  onClick={saveDepartment}
                  className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT DEPARTMENT MODAL */}

      {editModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditModal(false);
          }}
        >
          <div className="max-h-full w-full max-w-[480px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <h2 className="text-base font-bold">Edit Department</h2>
              <button
                onClick={() => setEditModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-xs font-semibold">
                Department Name
              </label>
              <input
                autoFocus
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && saveEdit()}
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
                <strong className="text-gray-900">
                  "{deleteTarget?.name}"
                </strong>
                ? This will also remove all of its sub-departments.
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
