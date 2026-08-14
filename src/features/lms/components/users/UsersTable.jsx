import { Eye, Users as UsersIcon } from "lucide-react";
import { formatDate } from "../../utils/operatorUtils";
import { ActionButton, TableCell, TableHeader } from "../operators/Table";
import { StatusBadge } from "../operators/Badges";

const COLUMNS = [
  "Emp Id",
  "Date",
  "Name",
  "Shift",
  "Scheduled Shift",
  "Status",
  "Efficiency",
  "Department",
  "Section",
  "Line",
  "Sub Section",
  "Station",
  "Role",
  "Actions",
];

const SEED_USERS = [
  {
    id: "user-001",
    empId: "EMP-101",
    date: "2026-08-14",
    name: "Rahul Sharma",
    shift: "Morning",
    scheduledShift: "Morning",
    status: "Active",
    efficiency: 92,
    department: "Production",
    section: "Assembly",
    line: "Line 1",
    subSection: "Sub 1",
    station: "Station 3",
    role: "Operator",
  },
  {
    id: "user-002",
    empId: "EMP-102",
    date: "2026-08-14",
    name: "Priya Verma",
    shift: "Evening",
    scheduledShift: "Evening",
    status: "Active",
    efficiency: 88,
    department: "Production",
    section: "Assembly",
    line: "Line 1",
    subSection: "Sub 2",
    station: "Station 5",
    role: "Supervisor",
  },
  {
    id: "user-003",
    empId: "EMP-103",
    date: "2026-08-13",
    name: "Amit Patel",
    shift: "Morning",
    scheduledShift: "Evening",
    status: "On Leave",
    efficiency: 76,
    department: "Quality",
    section: "Inspection",
    line: "Line 2",
    subSection: "Sub 1",
    station: "Station 1",
    role: "Operator",
  },
  {
    id: "user-004",
    empId: "EMP-104",
    date: "2026-08-13",
    name: "Sneha Iyer",
    shift: "Night",
    scheduledShift: "Night",
    status: "Active",
    efficiency: 95,
    department: "Production",
    section: "Packing",
    line: "Line 3",
    subSection: "Sub 3",
    station: "Station 2",
    role: "Operator",
  },
  {
    id: "user-005",
    empId: "EMP-105",
    date: "2026-08-12",
    name: "Vikram Singh",
    shift: "Evening",
    scheduledShift: "Evening",
    status: "Left",
    efficiency: 61,
    department: "HR",
    section: "Admin",
    line: "-",
    subSection: "-",
    station: "-",
    role: "Admin",
  },
];

export function UsersTable({ rows = SEED_USERS, onView }) {
  return (
    <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
      {/* TABLE TOOLBAR */}
      <div className="flex flex-col gap-3 border-b border-[#edf0f3] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[15px] font-bold text-[#26364d]">Users</h3>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1250px] border-collapse">
          <thead>
            <tr className="bg-[#f5f6f8]">
              {COLUMNS.map((column) => (
                <TableHeader key={column}>{column}</TableHeader>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="p-0">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              rows.map((user) => (
                <UserRow key={user.id} user={user} onView={onView} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserRow({ user, onView }) {
  return (
    <tr className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]">
      <TableCell bold>{user.empId}</TableCell>

      <TableCell>{formatDate(user.date)}</TableCell>

      <TableCell bold>
        <button
          type="button"
          onClick={() => onView && onView(user)}
          className="font-semibold text-[#344760] transition hover:text-[#6F4AE7] hover:underline"
        >
          {user.name}
        </button>
      </TableCell>

      <TableCell>{user.shift}</TableCell>

      <TableCell>{user.scheduledShift}</TableCell>

      <TableCell>
        <StatusBadge status={user.status} />
      </TableCell>

      <TableCell>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            user.efficiency >= 90
              ? "bg-[#e6f7ef] text-[#0f9d58]"
              : user.efficiency >= 75
                ? "bg-[#fff4e0] text-[#e6920b]"
                : "bg-[#fff0ee] text-[#e74c3c]"
          }`}
        >
          {user.efficiency}%
        </span>
      </TableCell>

      <TableCell>{user.department}</TableCell>

      <TableCell>{user.section}</TableCell>

      <TableCell>{user.line}</TableCell>

      <TableCell>{user.subSection}</TableCell>

      <TableCell>{user.station}</TableCell>

      <TableCell>{user.role}</TableCell>

      <TableCell>
        <div className="flex gap-2">
          {onView && (
            <ActionButton title="View user" onClick={() => onView(user)}>
              <Eye size={15} />
            </ActionButton>
          )}
        </div>
      </TableCell>
    </tr>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <UsersIcon size={42} className="mb-3 opacity-40" />

      <p className="text-sm">No users found.</p>
    </div>
  );
}