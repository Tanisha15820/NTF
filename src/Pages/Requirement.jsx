import { useState } from "react";
// import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
// import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
// import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
// import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Filters from "../Components/Filters";
// import KPICards from "../Components/KPICards";
import RequirementTable from "../Components/RequirementTable";
import { dashboardMenus } from "../Data/DashboardMenu";

// const kpiData = [
//   {
//     title: "Total Requirements",
//     value: 452,
//     color: "blue",
//     icon: <AssignmentOutlinedIcon sx={{ fontSize: 24 }} />,
//   },
//   {
//     title: "Approved",
//     value: 430,
//     color: "green",
//     icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 24 }} />,
//   },
//   {
//     title: "Pending",
//     value: 15,
//     color: "orange",
//     icon: <PendingActionsOutlinedIcon sx={{ fontSize: 24 }} />,
//   },
//   {
//     title: "Rejected",
//     value: 7,
//     color: "red",
//     icon: <HighlightOffOutlinedIcon sx={{ fontSize: 24 }} />,
//   },
// ];

const Requirement = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Requirement");

  return (
    <div className="flex h-screen bg-[#F5F7FB] overflow-hidden">
      <Sidebar
        menuItems={dashboardMenus}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Navbar setMobileOpen={setMobileOpen} activeMenu={activeMenu} />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Filters />
          {/* <KPICards data={kpiData} /> */}
          <RequirementTable />
        </main>
      </div>
    </div>
  );
};

export default Requirement;
