import { Fragment, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Layers,
  Activity,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import KPICards from "../Components/KPICards";
import LinesTable from "./LinesTable";
import Filters from "./Filters";

const STORAGE_KEY = "lms_departments";

const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

const Section = () => {
  const navigate = useNavigate();
  const { deptId } = useParams();

  /* =========================================================
     STATE
  ========================================================= */

  // Used to tell React that localStorage has changed
  const [storageVersion, setStorageVersion] = useState(0);

  const [search] = useState("");
  const [statusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  // Add section modal
  const [sectionModal, setSectionModal] = useState(false);
  const [sectionForm, setSectionForm] = useState({
    name: "",
    code: "",
    description: "",
    category: "Direct",
  });

  // Add line modal
  const [lineModal, setLineModal] = useState(false);
  const [lineTargetSection, setLineTargetSection] = useState(null);
  const [lineForm, setLineForm] = useState({
    name: "",
    code: "",
    leaders: "",
    mentor: "",
    requirement: "",
    description: "",
  });

  const [toast, setToast] = useState("");

  // Which section is currently expanded
  const [expandedSectionId, setExpandedSectionId] = useState(null);

  const [filterValues, setFilterValues] = useState({
    department: "",
    subDepartment: "",
    line: "",
    machine: "",
  });

  const itemsPerPage = 4;

  /* =========================================================
     LOAD SELECTED DEPARTMENT
     
     Instead of using useEffect + setDepartment(),
     we derive the department directly from localStorage.
  ========================================================= */

  const department = useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      return data.find((item) => String(item.id) === String(deptId)) || null;
    } catch (error) {
      console.error("Unable to load department:", error);
      return null;
    }
  }, [deptId, storageVersion]);

  /* =========================================================
     PREPARE SECTION DATA
  ========================================================= */

  const sections = useMemo(() => {
    if (!department?.sections) return [];

    return department.sections.map((section, index) => {
      let totalMachines = 0;

      section.lines?.forEach((line) => {
        line.subSections?.forEach((subSection) => {
          totalMachines += subSection.machines?.length || 0;
        });
      });

      return {
        ...section,

        serial: index + 1,

        totalMachines,

        status: section.status || "Active",

        createdAt: section.createdAt || "12 Apr 2025",

        code:
          section.code ||
          `${String(section.name || "SEC")
            .replace(/\s+/g, "")
            .substring(0, 3)
            .toUpperCase()}-${String(index + 1).padStart(2, "0")}`,
      };
    });
  }, [department]);

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const filterOptions = useMemo(() => {
    if (!department)
      return { departments: [], sections: [], lines: [], machines: [] };
    const unique = (list) => [...new Set(list.filter(Boolean))];

    const sectionsList = [];
    const linesList = [];
    const machinesList = [];

    (department.sections || []).forEach((section) => {
      sectionsList.push(section.name);
      (section.lines || []).forEach((line) => {
        linesList.push(line.name);
        (line.subSections || []).forEach((subSection) => {
          (subSection.machines || []).forEach((machine) => {
            machinesList.push(machine.name);
          });
        });
      });
    });

    return {
      departments: [department.name],
      sections: unique(sectionsList),
      lines: unique(linesList),
      machines: unique(machinesList),
    };
  }, [department]);

  /* =========================================================
     FILTER SECTIONS
  ========================================================= */

  const filteredSections = useMemo(() => {
    return sections.filter((section) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        section.name?.toLowerCase().includes(searchText) ||
        section.code?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        section.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesSection =
        !filterValues.subDepartment ||
        section.name === filterValues.subDepartment;

      const hasLine =
        !filterValues.line ||
        section.lines?.some((l) => l.name === filterValues.line);

      const hasMachine =
        !filterValues.machine ||
        section.lines?.some((l) =>
          l.subSections?.some((s) =>
            s.machines?.some((m) => m.name === filterValues.machine),
          ),
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSection &&
        hasLine &&
        hasMachine
      );
    });
  }, [sections, search, statusFilter, filterValues]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSections.length / itemsPerPage),
  );

  const paginatedSections = filteredSections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* =========================================================
     KPI DATA
  ========================================================= */

  const totalSections = sections.length;

  const activeSections = sections.filter(
    (section) => section.status?.toLowerCase() === "active",
  ).length;

  const inactiveSections = sections.filter(
    (section) => section.status?.toLowerCase() !== "active",
  ).length;

  const kpiData = [
    {
      title: "Total Sections",
      value: totalSections,
      color: "purple",
      icon: <Layers size={20} />,
    },
    {
      title: "Active Sections",
      value: activeSections,
      color: "green",
      icon: <Activity size={20} />,
    },
    {
      title: "Inactive Sections",
      value: inactiveSections,
      color: "red",
      icon: <Activity size={20} />,
    },
  ];

  /* =========================================================
     TOGGLE SECTION
  ========================================================= */

  const toggleSection = (sectionId) => {
    setExpandedSectionId((currentId) =>
      String(currentId) === String(sectionId) ? null : sectionId,
    );
  };

  /* =========================================================
     DELETE SECTION
  ========================================================= */

  const handleDelete = (sectionId) => {
    if (!department) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this section?",
    );

    if (!confirmed) return;

    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      const updatedData = data.map((dept) => {
        if (String(dept.id) !== String(department.id)) {
          return dept;
        }

        return {
          ...dept,

          sections: (dept.sections || []).filter(
            (section) => String(section.id) !== String(sectionId),
          ),
        };
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      /*
       * Refresh department data from localStorage.
       * This replaces the old setDepartment() call.
       */
      setStorageVersion((version) => version + 1);

      if (String(expandedSectionId) === String(sectionId)) {
        setExpandedSectionId(null);
      }

      /*
       * Make sure current page does not go beyond
       * the available pages after deletion.
       */
      const updatedDepartment = updatedData.find(
        (dept) => String(dept.id) === String(department.id),
      );

      const updatedSections = updatedDepartment?.sections || [];

      const newTotalPages = Math.max(
        1,
        Math.ceil(updatedSections.length / itemsPerPage),
      );

      setCurrentPage((page) => Math.min(page, newTotalPages));
    } catch (error) {
      console.error("Unable to delete section:", error);
    }
  };

  /* =========================================================
     EDIT SECTION
  ========================================================= */

  const handleEdit = (section) => {
    navigate(`/lms-section/edit/${department?.id}/${section.id}`);
  };

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =========================================================
     ADD SECTION
  ========================================================= */

  const openAddSection = () => {
    setSectionForm({
      name: "",
      code: "",
      description: "",
      category: "Direct",
    });

    setSectionModal(true);
  };

  const saveSection = () => {
    if (!department) return;

    const name = sectionForm.name.trim();
    const code = sectionForm.code.trim();

    if (!name) {
      showToast("Please enter section name.");
      return;
    }

    if (!code) {
      showToast("Please enter section UniCode.");
      return;
    }

    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      const duplicate = data.some((dept) =>
        (dept.sections || []).some(
          (section) =>
            String(section.code || "").toLowerCase() === code.toLowerCase(),
        ),
      );

      if (duplicate) {
        showToast("Section UniCode already exists.");
        return;
      }

      const updatedData = data.map((dept) => {
        if (String(dept.id) !== String(department.id)) {
          return dept;
        }

        const now = new Date();

        const createdAt = now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return {
          ...dept,
          sections: [
            ...(dept.sections || []),
            {
              id: createId("section"),
              name,
              code,
              description: sectionForm.description.trim(),
              category: sectionForm.category,
              status: "Active",
              createdAt,
              lines: [],
            },
          ],
        };
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      setStorageVersion((version) => version + 1);

      setSectionModal(false);

      showToast("Section created successfully.");
    } catch (error) {
      console.error("Unable to create section:", error);
    }
  };

  /* =========================================================
     ADD LINE
  ========================================================= */

  const openAddLine = (section) => {
    setLineTargetSection(section);

    setLineForm({
      name: "",
      code: "",
      leaders: "",
      mentor: "",
      requirement: "",
      description: "",
    });

    setLineModal(true);
  };

  const saveLine = () => {
    if (!department || !lineTargetSection) return;

    const name = lineForm.name.trim();
    const code = lineForm.code.trim();

    if (!name) {
      showToast("Please enter line name.");
      return;
    }

    if (!code) {
      showToast("Please enter line UniCode.");
      return;
    }

    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      const duplicate = data.some((dept) =>
        (dept.sections || []).some((section) =>
          (section.lines || []).some(
            (line) =>
              String(line.code || "").toLowerCase() === code.toLowerCase(),
          ),
        ),
      );

      if (duplicate) {
        showToast("Line UniCode already exists.");
        return;
      }

      const updatedData = data.map((dept) => {
        if (String(dept.id) !== String(department.id)) {
          return dept;
        }

        return {
          ...dept,
          sections: (dept.sections || []).map((section) => {
            if (String(section.id) !== String(lineTargetSection.id)) {
              return section;
            }

            return {
              ...section,
              lines: [
                ...(section.lines || []),
                {
                  id: createId("line"),
                  name,
                  code,
                  leaders: lineForm.leaders.trim(),
                  mentor: lineForm.mentor.trim(),
                  requirement: lineForm.requirement.trim(),
                  description: lineForm.description.trim(),
                  subSections: [],
                },
              ],
            };
          }),
        };
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      setStorageVersion((version) => version + 1);

      setLineModal(false);
      setLineTargetSection(null);

      showToast("Line created successfully.");
    } catch (error) {
      console.error("Unable to create line:", error);
    }
  };

  /*
    Connect your Line Add page here later.

    Example:

    navigate(
      `/lms-line/add/${department.id}/${section.id}`
    );
  */

  /* =========================================================
     EDIT LINE
  ========================================================= */

  const handleEditLine = (section, line) => {
    console.log("Edit line:", line, "Section:", section);

    /*
      Connect your Line Edit page here later.
    */
  };

  /* =========================================================
     DELETE LINE
  ========================================================= */

  const handleDeleteLine = (section, line) => {
    console.log("Delete line:", line, "Section:", section);

    /*
      Connect your Line delete logic here later.
    */
  };

  /* =========================================================
     DEPARTMENT NOT FOUND
  ========================================================= */

  if (!department) {
    return (
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-[#F5F7FB] text-[#26364d]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#f0ecff]">
            <Layers size={21} className="text-[#6c4ce8]" />
          </div>

          <h2 className="text-[15px] font-bold text-[#26364d]">
            Department not found
          </h2>

          <p className="mt-1 text-xs text-[#718096]">
            The selected department could not be found.
          </p>

          <button
            onClick={() => navigate("/lms-department")}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#6c4ce8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5937d1]"
          >
            <ArrowLeft size={16} />
            Back to Department
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="text-[#26364d]">
      <section className="p-4 sm:p-[30px_25px]">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c4ce8] to-[#8b6ffe] text-white shadow-md shadow-[#6c4ce8]/30">
                <Layers size={21} />
              </div>

              <div className="min-w-0">
                <h1 className="mt-0.5 truncate text-[15px] font-bold leading-5 text-[#26364d]">
                  {department.name}
                </h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage sections within this department
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/lms-department")}
                className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e3e6eb] bg-white px-4 text-xs font-semibold text-[#718096] transition hover:bg-[#f7f8fa] sm:flex-none"
              >
                <ArrowLeft size={15} />
                Back to Department
              </button>

              <button
                onClick={openAddSection}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6c4ce8] to-[#8b6ffe] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#6c4ce8]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6c4ce8]/30 sm:flex-none"
              >
                <Plus size={15} />
                Add Section
              </button>
            </div>
          </div>

          {/* =====================================================
            FILTERS
        ===================================================== */}
          <div className="m-4 sm:m-5">
            <Filters
              values={filterValues}
              onChange={setFilterValues}
              departmentOptions={filterOptions.departments}
              subDepartmentOptions={filterOptions.sections}
              lineOptions={filterOptions.lines}
              machineOptions={filterOptions.machines}
              machineLabel="Machine"
              showDates={true}
            />
          </div>

          {/* =====================================================
            KPI CARDS
        ===================================================== */}
          <div className="mx-4 mb-4 sm:mx-5 sm:mb-5">
            <KPICards data={kpiData} />
          </div>

          {/* =====================================================
            SECTION TABLE
        ===================================================== */}

          <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
            {/* TABLE HEADER */}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f3] px-4 py-4 sm:px-5 sm:py-[18px]">
              <div>
                <h2 className="text-[18px] font-bold text-[#26364d]">
                  Department Sections & Lines
                </h2>
              </div>
            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="bg-[#f5f6f8]">
                    <TableHeader>
                      <span className="sr-only">Expand</span>
                    </TableHeader>

                    <TableHeader>#</TableHeader>

                    <TableHeader>Section Name</TableHeader>

                    <TableHeader>Department</TableHeader>

                    <TableHeader>Total Machines</TableHeader>

                    <TableHeader>Description</TableHeader>

                    <TableHeader>Category</TableHeader>

                    <TableHeader>Status</TableHeader>

                    <TableHeader>Created At</TableHeader>

                    <TableHeader>Actions</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {paginatedSections.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-0">
                        <div className="flex flex-col items-center justify-center py-16 text-[#9aa3af]">
                          <div className="mb-3 flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#f0ecff]">
                            <Layers size={21} className="text-[#6c4ce8]" />
                          </div>

                          <p className="text-[14px] font-semibold text-[#26364d]">
                            No sections found
                          </p>

                          <p className="mt-1 text-[13px] text-[#718096]">
                            Try changing your search or filter.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedSections.map((section, index) => {
                      const isExpanded =
                        String(expandedSectionId) === String(section.id);

                      return (
                        <Fragment key={section.id || index}>
                          {/* SECTION ROW */}

                          <tr
                            className={`group border-b border-[#edf0f2] transition ${
                              isExpanded ? "bg-[#fafaff]" : "hover:bg-[#fafaff]"
                            }`}
                          >
                            {/* EXPAND */}

                            <td className="py-3 pl-4">
                              <button
                                type="button"
                                onClick={() => toggleSection(section.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#f0ecff] hover:text-[#6c4ce8]"
                                title={
                                  isExpanded
                                    ? "Collapse section"
                                    : "Expand section"
                                }
                              >
                                {isExpanded ? (
                                  <ChevronUp size={15} />
                                ) : (
                                  <ChevronDown size={15} />
                                )}
                              </button>
                            </td>

                            {/* SERIAL */}

                            <TableCell>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </TableCell>

                            {/* SECTION NAME */}

                            <td className="px-3 py-3 sm:px-4">
                              <button
                                type="button"
                                onClick={() => toggleSection(section.id)}
                                className="text-left"
                              >
                                <p className="text-[14px] font-semibold text-[#344760] transition hover:text-[#6c4ce8] hover:underline">
                                  {section.name || "Unnamed Section"}
                                </p>

                                <p className="mt-0.5 text-[13px] text-[#718096]">
                                  {section.code}
                                </p>
                              </button>
                            </td>

                            {/* DEPARTMENT */}

                            <td className="px-3 py-3 sm:px-4">
                              <p className="max-w-[150px] text-[14px] font-medium leading-5 text-[#44556c]">
                                {department.name}
                              </p>
                            </td>

                            {/* MACHINES */}

                            <td className="px-3 py-3 sm:px-4">
                              <span className="text-[14px] font-bold text-[#6c4ce8]">
                                {section.totalMachines}
                              </span>
                            </td>

                            {/* DESCRIPTION */}

                            <TableCell>
                              <p className="max-w-[180px] truncate text-[13px] leading-5 text-[#718096]">
                                {section.description || "—"}
                              </p>
                            </TableCell>

                            {/* CATEGORY */}

                            <TableCell>
                              <CategoryBadge category={section.category} />
                            </TableCell>

                            {/* STATUS */}

                            <td className="px-3 py-3 sm:px-4">
                              <StatusBadge status={section.status} />
                            </td>

                            {/* CREATED */}

                            <td className="px-3 py-3 sm:px-4">
                              <div>
                                <p className="text-[14px] font-medium text-[#44556c]">
                                  {section.createdAt}
                                </p>

                                <p className="mt-0.5 text-[13px] text-[#9aa3af]">
                                  10:24 AM
                                </p>
                              </div>
                            </td>

                            {/* ACTIONS */}

                            <td className="px-3 py-3 sm:px-4">
                              <div className="flex gap-2">
                                {/* EDIT */}

                                <button
                                  type="button"
                                  onClick={() => handleEdit(section)}
                                  className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#f0ecff] text-[#6c4ce8] transition hover:bg-[#e6dfff]"
                                  title="Edit section"
                                >
                                  <Pencil size={15} />
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() => handleDelete(section.id)}
                                  className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
                                  title="Delete section"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* =================================================
                              EXPANDED LINE TABLE
                          ================================================= */}

                          {isExpanded && (
                            <tr className="border-b border-[#edf0f2] bg-[#fafaff]">
                              <td colSpan={10} className="p-3 sm:p-4">
                                <LinesTable
                                  deptId={department.id}
                                  sectionId={section.id}
                                  lines={section.lines || []}
                                  onAddLine={() => openAddLine(section)}
                                  onEditLine={(line) =>
                                    handleEditLine(section, line)
                                  }
                                  onDeleteLine={(line) =>
                                    handleDeleteLine(section, line)
                                  }
                                />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* =====================================================
              PAGINATION
          ===================================================== */}

            <div className="flex flex-col gap-3 border-t border-[#edf0f3] px-4 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5">
              <p className="text-xs text-[#718096]">
                Showing{" "}
                <span className="font-semibold text-[#26364d]">
                  {filteredSections.length === 0
                    ? 0
                    : (currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#26364d]">
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredSections.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#26364d]">
                  {filteredSections.length}
                </span>{" "}
                sections
              </p>

              <div className="flex flex-wrap items-center gap-1">
                {/* PREVIOUS */}

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex h-8 items-center gap-1 rounded-lg border border-[#e3e6eb] px-2.5 text-xs font-medium text-[#718096] transition hover:bg-[#f0ecff] hover:text-[#6c4ce8] disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                >
                  <ChevronLeft size={13} />
                  Previous
                </button>

                {/* PAGE NUMBERS */}

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                      currentPage === page
                        ? "bg-[#6c4ce8] text-white"
                        : "border border-[#e3e6eb] text-[#718096] hover:bg-[#f0ecff]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* NEXT */}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="flex h-8 items-center gap-1 rounded-lg border border-[#e3e6eb] px-2.5 text-xs font-medium text-[#718096] transition hover:bg-[#f0ecff] hover:text-[#6c4ce8] disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                >
                  Next
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ADD SECTION MODAL
      ===================================================== */}

      {sectionModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSectionModal(false);
            }
          }}
        >
          <div className="max-h-full w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <div>
                <h2 className="text-[15px] font-bold text-[#26364d]">
                  Add Section
                </h2>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Create a new section within this department
                </p>
              </div>

              <button
                onClick={() => setSectionModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#f5f6f8] hover:text-[#344760]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Section Name
                  </label>

                  <input
                    autoFocus
                    value={sectionForm.name}
                    onChange={(e) =>
                      setSectionForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter section name"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    UniCode
                    <span className="ml-1 text-[#e74c3c]">*</span>
                  </label>

                  <input
                    value={sectionForm.code}
                    onChange={(e) =>
                      setSectionForm((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                    placeholder="Enter unique code"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Description
                    <span className="ml-1 text-[#9aa3af]">(optional)</span>
                  </label>

                  <textarea
                    value={sectionForm.description}
                    onChange={(e) =>
                      setSectionForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter description"
                    rows={3}
                    className="w-full rounded-lg border border-[#d5d9df] px-3 py-2.5 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Category
                  </label>

                  <select
                    value={sectionForm.category}
                    onChange={(e) =>
                      setSectionForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  >
                    <option value="Direct">Direct</option>
                    <option value="Indirect">Indirect</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setSectionModal(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={saveSection}
                  className="rounded-lg bg-[#6c4ce8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5937d1]"
                >
                  Create Section
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ADD LINE MODAL
      ===================================================== */}

      {lineModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setLineModal(false);
            }
          }}
        >
          <div className="max-h-full w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <div>
                <h2 className="text-[15px] font-bold text-[#26364d]">
                  Add Line
                </h2>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Create a new line within this section
                </p>
              </div>

              <button
                onClick={() => setLineModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#f5f6f8] hover:text-[#344760]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Line Name
                  </label>

                  <input
                    autoFocus
                    value={lineForm.name}
                    onChange={(e) =>
                      setLineForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter line name"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    UniCode
                    <span className="ml-1 text-[#e74c3c]">*</span>
                  </label>

                  <input
                    value={lineForm.code}
                    onChange={(e) =>
                      setLineForm((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                    placeholder="Enter unique code"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Line Leaders
                  </label>

                  <input
                    value={lineForm.leaders}
                    onChange={(e) =>
                      setLineForm((prev) => ({
                        ...prev,
                        leaders: e.target.value,
                      }))
                    }
                    placeholder="Enter line leader(s)"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Mentor
                  </label>

                  <input
                    value={lineForm.mentor}
                    onChange={(e) =>
                      setLineForm((prev) => ({
                        ...prev,
                        mentor: e.target.value,
                      }))
                    }
                    placeholder="Enter mentor name"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Requirement
                  </label>

                  <input
                    value={lineForm.requirement}
                    onChange={(e) =>
                      setLineForm((prev) => ({
                        ...prev,
                        requirement: e.target.value,
                      }))
                    }
                    placeholder="Enter requirement"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Description
                  </label>

                  <textarea
                    value={lineForm.description}
                    onChange={(e) =>
                      setLineForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter description"
                    rows={3}
                    className="w-full rounded-lg border border-[#d5d9df] px-3 py-2.5 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setLineModal(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={saveLine}
                  className="rounded-lg bg-[#6c4ce8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5937d1]"
                >
                  Create Line
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#10b981] bg-[#202938] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   TABLE HEADER
============================================================ */

const TableHeader = ({ children }) => {
  return (
    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
      {children}
    </th>
  );
};

/* ============================================================
   TABLE CELL
============================================================ */

const TableCell = ({ children }) => {
  return (
    <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
      {children}
    </td>
  );
};

/* ============================================================
   STATUS BADGE
============================================================ */

const StatusBadge = ({ status }) => {
  const isActive = status?.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
        isActive ? "bg-green-100 text-green-600" : "bg-[#f5f6f8] text-[#718096]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-green-600" : "bg-[#9aa3af]"
        }`}
      />

      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

/* ============================================================
   CATEGORY BADGE
============================================================ */

const CategoryBadge = ({ category }) => {
  const value = String(category || "").toLowerCase();

  const classes =
    value === "indirect"
      ? "bg-[#f0ecff] text-[#6c4ce8]"
      : value === "not applicable"
        ? "bg-[#eef7ff] text-[#3182ce]"
        : "bg-[#f5f6f8] text-[#718096]";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold ${classes}`}
    >
      {category || "—"}
    </span>
  );
};

export default Section;
