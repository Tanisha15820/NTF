// import { useState } from "react";
// import { TablePagination, IconButton, Tooltip } from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

// const rows = [
//   {
//     id: 1,
//     title: "L0",
//     questions: 50,
//     marks: 100,
//     duration: "60 mins",
//     status: "Published",
//     updated: "12 May 2025, 11:30 AM",
//   },
//   {
//     id: 2,
//     title: "L1",
//     questions: 40,
//     marks: 80,
//     duration: "50 mins",
//     status: "Draft",
//     updated: "13 May 2025, 09:45 AM",
//   },
//   {
//     id: 3,
//     title: "L2",
//     questions: 60,
//     marks: 120,
//     duration: "75 mins",
//     status: "Published",
//     updated: "15 May 2025, 02:15 PM",
//   },
//   {
//     id: 4,
//     title: "L3",
//     questions: 75,
//     marks: 150,
//     duration: "90 mins",
//     status: "Published",
//     updated: "18 May 2025, 04:30 PM",
//   },
// ];

// const statusStyles = {
//   Published: {
//     badge: "bg-green-100 text-green-700 ring-green-600/20",
//     dot: "bg-green-500",
//   },
//   Draft: {
//     badge: "bg-amber-100 text-amber-700 ring-amber-600/20",
//     dot: "bg-amber-500",
//   },
// };

// const QuestionPaperTable = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 py-4 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center shadow-sm">
//             <DescriptionOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
//           </div>

//           <div>
//             <h2 className="text-base font-bold text-gray-900 leading-tight">
//               LMS Records
//             </h2>
//             <p className="text-xs text-gray-500">
//               View and manage question papers
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[1100px] border-collapse">
//           <thead>
//             <tr className="bg-gray-100/80">
//               {[
//                 "Paper Title",
//                 "Questions",
//                 "Marks",
//                 "Duration",
//                 "Status",
//                 "Updated On",
//                 "Actions",
//               ].map((head) => (
//                 <th
//                   key={head}
//                   className={`px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-r border-gray-200 ${
//                     head === "Actions" ? "text-center" : "text-left"
//                   }`}
//                 >
//                   {head}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, rowIdx) => {
//                 const status = statusStyles[row.status] || statusStyles.Draft;
//                 return (
//                   <tr
//                     key={row.id}
//                     className={`whitespace-nowrap transition hover:bg-primary/5 ${
//                       rowIdx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
//                     }`}
//                   >
//                     <td className="px-4 py-3 border-b border-r border-gray-100">
//                       <div className="min-w-0">
//                         <p className="text-xs font-medium text-gray-500 truncate">
//                           {row.title}
//                         </p>
//                       </div>
//                     </td>

//                     <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
//                       {row.questions}
//                     </td>
//                     <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
//                       {row.marks}
//                     </td>
//                     <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
//                       {row.duration}
//                     </td>

//                     <td className="px-4 py-3 text-left border-b border-r border-gray-100">
//                       <span
//                         className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${status.badge}`}
//                       >
//                         <span
//                           className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
//                         />
//                         {row.status}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
//                       {row.updated}
//                     </td>

//                     <td className="px-4 py-3 text-center border-b border-gray-100">
//                       <div className="flex items-center justify-center gap-0.5">
//                         <Tooltip title="Edit">
//                           <IconButton size="small">
//                             <EditOutlinedIcon
//                               sx={{ color: "#F59E0B", fontSize: 18 }}
//                             />
//                           </IconButton>
//                         </Tooltip>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>

//         <TablePagination
//           component="div"
//           count={rows.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[10, 25, 50]}
//           sx={{
//             borderTop: "1px solid #E5E7EB",
//             ".MuiTablePagination-toolbar": {
//               minHeight: "48px",
//             },
//             ".MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows":
//               {
//                 fontSize: "12px",
//                 color: "#6B7280",
//               },
//             ".MuiTablePagination-select": {
//               borderRadius: "6px",
//               border: "1px solid #E5E7EB",
//               padding: "4px 8px",
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default QuestionPaperTable;


import { useState } from "react";
import {
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Filters from "./Filters";

const rows = [
  {
    id: 1,
    title: "CNC MANUAL SAFETY MODULE TEST PAPER 1",
    target: "80% or Above",
    testType: "Online",
    course: "Life Skills",
    passing: "80% or Above",
    qualified: true,
    marks: "8 Marks",
    fullMarks: "Full Marks",
  },
   {
    id: 1,
    title: "CNC MANUAL SAFETY MODULE TEST PAPER 1",
    target: "80% or Above",
    testType: "Online",
    course: "Life Skills",
    passing: "80% or Above",
    qualified: true,
    marks: "8 Marks",
    fullMarks: "Full Marks",
  },

];

const QuestionPaperTable = ({
  onCreate,

}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center shadow-sm">
            <DescriptionOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              Test Papers
            </h2>
            <p className="text-xs text-gray-500">
              Browse and manage test papers
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 text-xs font-semibold text-white shadow-sm hover:bg-[#5F3ED1]">
          <AddOutlinedIcon sx={{ fontSize: 18 }} />
          Create Test Paper
        </button>
      </div>

      <div className="px-5 pb-4 pt-4">
          <Filters />
      </div>

      <div className="px-5 pb-5">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="bg-gray-100/80">
              {[
                "Test Paper Title",
                "Target / Standard",
                "Test Type",
                "Course / Module",
                "Passing Criteria",
                "Total Marks",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className={`px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-600 border-b border-r border-gray-200 ${
                    head === "Actions" ? "text-center" : "text-left"
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-gray-400"
                >
                  No test papers found
                </td>
              </tr>
            )}

            {displayedRows.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={`whitespace-nowrap transition hover:bg-primary/5 ${
                  rowIdx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3">
                  <p className="max-w-[210px] text-xs font-medium text-gray-500 leading-4">
                    {row.title}
                  </p>
                </td>

                <td className="px-4 py-3 border-b border-r border-gray-100">
                  <p className="max-w-[100px] text-xs leading-4 text-gray-500">
                    {row.target}
                  </p>
                </td>

                <td className="px-4 py-3 border-b border-r border-gray-100">
                  <span className="text-xs font-semibold text-[#6F4AE7]">
                    {row.testType}
                  </span>
                </td>

                <td className="px-4 py-3 text-xs text-gray-500 border-b border-r border-gray-100">
                  {row.course}
                </td>

                <td className="px-4 py-3 border-b border-r border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="max-w-[95px] text-xs text-gray-500">
                      {row.passing}
                    </span>

                  </div>
                </td>

                <td className="px-4 py-3 border-b border-r border-gray-100">
                  <p className="text-xs font-medium text-gray-500">
                    {row.marks}
                  </p>
                  <p className="text-[11px] font-medium text-emerald-500">
                    {row.fullMarks}
                  </p>
                </td>
                <td className="px-4 py-3 text-center border-b border-gray-100">
                  <Tooltip title="More actions">
                    <IconButton
                      size="small"
                      sx={{
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        color: "#6B7280",
                        "&:hover": {
                          borderColor: "#6F4AE7",
                          color: "#6F4AE7",
                          bgcolor: "primary/5",
                        },
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{
          borderTop: "1px solid #E5E7EB",

          ".MuiTablePagination-toolbar": {
            minHeight: "48px",
          },

          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              fontSize: "11px",
              color: "#6B7280",
            },

          ".MuiTablePagination-select": {
            border: "1px solid #E5E7EB",
            borderRadius: "6px",
            padding: "4px 25px 4px 8px",
            fontSize: "11px",
          },
        }}
      />
        </div>
      </div>
    </div>
  );
};

export default QuestionPaperTable;