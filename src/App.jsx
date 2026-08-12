import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Requirement from "./Pages/Requirement";
import LMS from "./Pages/LMS";
import L0 from "./Pages/L0";
import L0Preview from "./Pages/L0Preview";
import L1 from "./Pages/L1";
import L1Preview from "./Pages/L1Preview";
import DepartmentPage from "./Pages/Department";
import SectionPage from "./Pages/SectionPage";
import MachinePage from "./Pages/MachinePage";
import Roles from "./Pages/Roles";
import LMSDashboard from "./Pages/LMSDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/attendance" element={<Attendance />} />

        <Route path="/requirement" element={<Requirement />} />
        <Route path="/lms" element={<LMS />} />
        <Route path="/lms-dashboard" element={<LMSDashboard />} />
        <Route path="/lms-department" element={<DepartmentPage />} />
        {/* View Section */}
        <Route path="/lms-section/:deptId" element={<SectionPage />} />

        {/* Add Section */}
        <Route path="/lms-section/add/:deptId" element={<SectionPage />} />

        {/* Edit Section */}
        <Route
          path="/lms-section/edit/:deptId/:sectionId"
          element={<SectionPage />}
        />

        {/* 
          URL:
          /lms-machine/:deptId/:sectionId/:lineId

          Example:
          /lms-machine/department_123/section_456/line_789
        */}
        <Route
          path="/lms-machine/:deptId/:sectionId/:lineId"
          element={<MachinePage />}
        />

        <Route path="/lms-roles" element={<Roles />} />

        <Route path="/lms/l0" element={<L0 />} />

        <Route path="/lms/l0/preview" element={<L0Preview />} />

        <Route path="/lms/l1" element={<L1 />} />

        <Route path="/lms/l1/preview" element={<L1Preview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
