import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

export const lmsMenus = [
  {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    path: "/lms/dashboard",
  },
  {
    name: "DOJO Hiring",
    icon: <SchoolOutlinedIcon />,
    path: "/lms",
  },
  {
    name: "Department",
    icon: <ApartmentOutlinedIcon />,
    path: "/lms/department",
  },

  {
    name: "Operators",
    icon: <EngineeringOutlinedIcon />,
    path: "/lms/operators",
  },
  {
    name: "Users",
    icon: <ManageAccountsOutlinedIcon />,
    path: "/lms/users",
  },
  {
    name: "Roles & Permissions",
    icon: <AdminPanelSettingsOutlinedIcon />,
    path: "/lms/roles",
  },
];
