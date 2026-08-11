import { Fragment, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Layers,
  Activity,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import KPICards from "../Components/KPICards";
import LinesTable from "./LinesTable";
import Filters from "./Filters";

const STORAGE_KEY = "lms_departments";

const Section = () => {
  const navigate = useNavigate();
  const { deptId } = useParams();

  /* =========================================================
     STATE
  ========================================================= */

  // Used to tell React that localStorage has changed
  const [storageVersion, setStorageVersion] = useState(0);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

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
      const data =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      return (
        data.find(
          (item) => String(item.id) === String(deptId)
        ) || null
      );
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
    if (!department) return { departments: [], sections: [], lines: [], machines: [] };
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
        section.status?.toLowerCase() ===
          statusFilter.toLowerCase();

      const matchesSection = !filterValues.subDepartment || section.name === filterValues.subDepartment;
      
      const hasLine = !filterValues.line || section.lines?.some(l => l.name === filterValues.line);
      
      const hasMachine = !filterValues.machine || section.lines?.some(l => 
        l.subSections?.some(s => s.machines?.some(m => m.name === filterValues.machine))
      );

      return matchesSearch && matchesStatus && matchesSection && hasLine && hasMachine;
    });
  }, [sections, search, statusFilter, filterValues]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSections.length / itemsPerPage)
  );

  const paginatedSections = filteredSections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* =========================================================
     KPI DATA
  ========================================================= */

  const totalSections = sections.length;

  const activeSections = sections.filter(
    (section) => section.status?.toLowerCase() === "active"
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
  ];

  /* =========================================================
     TOGGLE SECTION
  ========================================================= */

  const toggleSection = (sectionId) => {
    setExpandedSectionId((currentId) =>
      String(currentId) === String(sectionId)
        ? null
        : sectionId
    );

    setShowMenu(null);
  };

  /* =========================================================
     DELETE SECTION
  ========================================================= */

  const handleDelete = (sectionId) => {
    if (!department) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this section?"
    );

    if (!confirmed) return;

    try {
      const data =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      const updatedData = data.map((dept) => {
        if (String(dept.id) !== String(department.id)) {
          return dept;
        }

        return {
          ...dept,

          sections: (dept.sections || []).filter(
            (section) =>
              String(section.id) !== String(sectionId)
          ),
        };
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedData)
      );

      /*
       * Refresh department data from localStorage.
       * This replaces the old setDepartment() call.
       */
      setStorageVersion((version) => version + 1);

      setShowMenu(null);

      if (
        String(expandedSectionId) === String(sectionId)
      ) {
        setExpandedSectionId(null);
      }

      /*
       * Make sure current page does not go beyond
       * the available pages after deletion.
       */
      const updatedDepartment = updatedData.find(
        (dept) =>
          String(dept.id) === String(department.id)
      );

      const updatedSections =
        updatedDepartment?.sections || [];

      const newTotalPages = Math.max(
        1,
        Math.ceil(updatedSections.length / itemsPerPage)
      );

      setCurrentPage((page) =>
        Math.min(page, newTotalPages)
      );
    } catch (error) {
      console.error(
        "Unable to delete section:",
        error
      );
    }
  };

  /* =========================================================
     EDIT SECTION
  ========================================================= */

  const handleEdit = (section) => {
    setShowMenu(null);

    navigate(
      `/lms-section/edit/${department?.id}/${section.id}`
    );
  };

  /* =========================================================
     ADD SECTION
  ========================================================= */

  const handleAddSection = () => {
    if (!department?.id) return;

    navigate(`/lms-section/add/${department.id}`);
  };

  /* =========================================================
     ADD LINE
  ========================================================= */

  const handleAddLine = (section) => {
    console.log("Add line to section:", section);

    /*
      Connect your Line Add page here later.

      Example:

      navigate(
        `/lms-line/add/${department.id}/${section.id}`
      );
    */
  };

  /* =========================================================
     EDIT LINE
  ========================================================= */

  const handleEditLine = (section, line) => {
    console.log(
      "Edit line:",
      line,
      "Section:",
      section
    );

    /*
      Connect your Line Edit page here later.
    */
  };

  /* =========================================================
     DELETE LINE
  ========================================================= */

  const handleDeleteLine = (section, line) => {
    console.log(
      "Delete line:",
      line,
      "Section:",
      section
    );

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
            <Layers
              size={21}
              className="text-[#6c4ce8]"
            />
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
      <section className="p-[30px_25px]">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">

          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf0f3] px-5 py-[18px]">

            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-gradient-to-br from-[#6c4ce8] to-[#8b6ffe] text-white shadow-md shadow-[#6c4ce8]/30">
                <Layers size={21} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#718096]">
                  Department
                </p>

                <h1 className="mt-0.5 text-[15px] font-bold leading-5 text-[#26364d]">
                  {department.name}
                </h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage sections within this department
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  navigate("/lms-department")
                }
                className="flex h-[38px] items-center gap-1.5 rounded-lg border border-[#e3e6eb] bg-white px-4 text-xs font-semibold text-[#718096] transition hover:bg-[#f7f8fa]"
              >
                <ArrowLeft size={15} />
                Back to Department
              </button>

              <button
                onClick={handleAddSection}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6c4ce8] to-[#8b6ffe] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#6c4ce8]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6c4ce8]/30"
              >
                <Plus size={15} />
                Add Section
              </button>

            </div>
          </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}
        <div className="m-5">
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
        <div className="mx-5 mb-5">
          <KPICards data={kpiData} />
        </div>

        {/* =====================================================
            SECTION TABLE
        ===================================================== */}

        <div className="mx-5 mb-5 overflow-hidden rounded-[14px] border border-[#e3e6eb]">

          {/* TABLE HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f3] px-5 py-[18px]">

            <div>
              <h2 className="text-[13px] font-bold text-[#26364d]">
                Department Sections
              </h2>

              <p className="mt-0.5 text-xs text-[#718096]">
                A total{" "}
                {filteredSections.length}{" "}
                sections found
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-[260px]">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3af]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                    setExpandedSectionId(null);
                  }}
                  placeholder="Search sections..."
                  className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] text-[#26364d] outline-none transition placeholder:text-[#9aa3af] focus:border-[#6c4ce8] focus:bg-white"
                />
              </div>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  disabled
                  className="h-9 appearance-none rounded-lg border border-[#e3e6eb] bg-white px-3 pr-8 text-xs font-semibold text-[#718096] outline-none"
                >
                  <option value={4}>
                    4 per page
                  </option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#718096]"
                />
              </div>
            </div>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] border-collapse">

              <thead>
                <tr className="bg-[#f5f6f8]">

                  <TableHeader>
                    <span className="sr-only">
                      Expand
                    </span>
                  </TableHeader>

                  <TableHeader>
                    #
                  </TableHeader>

                  <TableHeader>
                    Section Name
                  </TableHeader>

                  <TableHeader>
                    Department
                  </TableHeader>

                  <TableHeader>
                    Total Machines
                  </TableHeader>

                  <TableHeader>
                    Status
                  </TableHeader>

                  <TableHeader>
                    Created At
                  </TableHeader>

                  <TableHeader>
                    Actions
                  </TableHeader>

                </tr>
              </thead>

              <tbody>

                {paginatedSections.length === 0 ? (

                  <tr>
                    <td colSpan={8} className="p-0">

                      <div className="flex flex-col items-center justify-center py-16 text-[#9aa3af]">

                        <div className="mb-3 flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#f0ecff]">
                          <Layers
                            size={21}
                            className="text-[#6c4ce8]"
                          />
                        </div>

                        <p className="text-[13px] font-semibold text-[#26364d]">
                          No sections found
                        </p>

                        <p className="mt-1 text-xs text-[#718096]">
                          Try changing your search or filter.
                        </p>

                      </div>

                    </td>
                  </tr>

                ) : (

                  paginatedSections.map(
                    (section, index) => {

                      const isExpanded =
                        String(expandedSectionId) ===
                        String(section.id);

                      return (
                        <Fragment
                          key={
                            section.id || index
                          }
                        >

                          {/* SECTION ROW */}

                          <tr
                            className={`group border-b border-[#edf0f2] transition ${
                              isExpanded
                                ? "bg-[#fafaff]"
                                : "hover:bg-[#fafaff]"
                            }`}
                          >

                            {/* EXPAND */}

                            <td className="py-3 pl-4">

                              <button
                                type="button"
                                onClick={() =>
                                  toggleSection(
                                    section.id
                                  )
                                }
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
                              {(currentPage - 1) *
                                itemsPerPage +
                                index +
                                1}
                            </TableCell>

                            {/* SECTION NAME */}

                            <td className="px-4 py-3">

                              <button
                                type="button"
                                onClick={() =>
                                  toggleSection(
                                    section.id
                                  )
                                }
                                className="text-left"
                              >
                                <p className="text-[13px] font-semibold text-[#344760] transition hover:text-[#6c4ce8] hover:underline">
                                  {section.name ||
                                    "Unnamed Section"}
                                </p>

                                <p className="mt-0.5 text-xs text-[#718096]">
                                  {section.code}
                                </p>
                              </button>

                            </td>

                            {/* DEPARTMENT */}

                            <td className="px-4 py-3">

                              <p className="max-w-[150px] text-[13px] font-medium leading-5 text-[#44556c]">
                                {department.name}
                              </p>

                            </td>

                            {/* MACHINES */}

                            <td className="px-4 py-3">

                              <span className="text-[13px] font-bold text-[#6c4ce8]">
                                {section.totalMachines}
                              </span>

                            </td>

                            {/* STATUS */}

                            <td className="px-4 py-3">

                              <StatusBadge
                                status={section.status}
                              />

                            </td>

                            {/* CREATED */}

                            <td className="px-4 py-3">

                              <div>
                                <p className="text-[13px] font-medium text-[#44556c]">
                                  {section.createdAt}
                                </p>

                                <p className="mt-0.5 text-xs text-[#9aa3af]">
                                  10:24 AM
                                </p>
                              </div>

                            </td>

                            {/* ACTIONS */}

                            <td className="relative px-4 py-3">

                              <div
                                className="flex items-center gap-1.5"
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                              >

                                {/* MORE */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowMenu(
                                      showMenu ===
                                        section.id
                                        ? null
                                        : section.id
                                    )
                                  }
                                  className="flex h-[34px] w-[34px] items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#f0ecff] hover:text-[#6c4ce8]"
                                  title="More"
                                >
                                  <MoreHorizontal size={16} />
                                </button>

                                {/* EDIT */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEdit(section)
                                  }
                                  className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6c4ce8] transition hover:bg-[#e6dfff]"
                                  title="Edit section"
                                >
                                  <Pencil size={15} />
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      section.id
                                    )
                                  }
                                  className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
                                  title="Delete section"
                                >
                                  <Trash2 size={15} />
                                </button>

                              </div>

                              {/* MORE MENU */}

                              {showMenu === section.id && (
                                <div
                                  className="absolute right-4 top-[46px] z-30 w-[120px] rounded-lg border border-[#e3e6eb] bg-white p-1 shadow-xl"
                                  onClick={(e) =>
                                    e.stopPropagation()
                                  }
                                >

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEdit(section)
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-[#718096] hover:bg-[#f0ecff] hover:text-[#6c4ce8]"
                                  >
                                    <Pencil size={13} />
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        section.id
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-[#e74c3c] hover:bg-[#fff0ee]"
                                  >
                                    <Trash2 size={13} />
                                    Delete
                                  </button>

                                </div>
                              )}

                            </td>

                          </tr>

                          {/* =================================================
                              EXPANDED LINE TABLE
                          ================================================= */}

                          {isExpanded && (
                            <tr className="border-b border-[#edf0f2] bg-[#fafaff]">

                              <td
                                colSpan={8}
                                className="p-4"
                              >

                                <LinesTable
                                  deptId={department.id}
                                  sectionId={section.id}
                                  lines={
                                    section.lines || []
                                  }

                                  onAddLine={() =>
                                    handleAddLine(
                                      section
                                    )
                                  }

                                  onEditLine={(line) =>
                                    handleEditLine(
                                      section,
                                      line
                                    )
                                  }

                                  onDeleteLine={(line) =>
                                    handleDeleteLine(
                                      section,
                                      line
                                    )
                                  }
                                />

                              </td>

                            </tr>
                          )}

                        </Fragment>
                      );
                    }
                  )

                )}

              </tbody>

            </table>

          </div>

          {/* =====================================================
              PAGINATION
          ===================================================== */}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf0f3] px-5 py-3.5">

            <p className="text-xs text-[#718096]">

              Showing{" "}

              <span className="font-semibold text-[#26364d]">
                {filteredSections.length === 0
                  ? 0
                  : (currentPage - 1) *
                      itemsPerPage +
                    1}
              </span>

              {" "}to{" "}

              <span className="font-semibold text-[#26364d]">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredSections.length
                )}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-[#26364d]">
                {filteredSections.length}
              </span>

              {" "}sections

            </p>

            <div className="flex items-center gap-1">

              {/* PREVIOUS */}

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                className="flex h-8 items-center gap-1 rounded-lg border border-[#e3e6eb] px-3 text-xs font-medium text-[#718096] transition hover:bg-[#f0ecff] hover:text-[#6c4ce8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={13} />
                Previous
              </button>

              {/* PAGE NUMBERS */}

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
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
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                  )
                }
                className="flex h-8 items-center gap-1 rounded-lg border border-[#e3e6eb] px-3 text-xs font-medium text-[#718096] transition hover:bg-[#f0ecff] hover:text-[#6c4ce8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={13} />
              </button>

            </div>

          </div>

        </div>
        </div>
      </section>
    </div>
  );
};

/* ============================================================
   TABLE HEADER
============================================================ */

const TableHeader = ({ children }) => {
  return (
    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#3b4b62] last:border-r-0">
      {children}
    </th>
  );
};

/* ============================================================
   TABLE CELL
============================================================ */

const TableCell = ({ children }) => {
  return (
    <td className="border-r border-[#edf0f2] px-4 py-3 text-[13px] font-medium text-[#44556c] last:border-r-0">
      {children}
    </td>
  );
};

/* ============================================================
   STATUS BADGE
============================================================ */

const StatusBadge = ({ status }) => {
  const isActive =
    status?.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        isActive
          ? "bg-green-100 text-green-600"
          : "bg-[#f5f6f8] text-[#718096]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive
            ? "bg-green-600"
            : "bg-[#9aa3af]"
        }`}
      />

      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

export default Section;
