import { useState } from "react";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import Filters from "../../../components/Filters";
import { UsersTable } from "./users/UsersTable";

const Users = () => {
  const [filterValues, setFilterValues] = useState({});

  return (
    <div className="text-[#26364d]">
      <section className="py-4">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* PAGE HEADER */}
          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-[#6F4AE7] text-white">
                <ManageAccountsOutlinedIcon sx={{ fontSize: 21 }} />
              </div>

              <div className="min-w-0">
                <h1 className="text-[15px] font-bold">Users Management</h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage users, access and account status
                </p>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="m-4 sm:m-5">
            <Filters
              values={filterValues}
              onChange={setFilterValues}
              departmentOptions={["HR", "Admin", "Quality", "Production"]}
              subDepartmentOptions={["Sub 1", "Sub 2", "Sub 3"]}
              lineOptions={["Line 1", "Line 2", "Line 3"]}
              machineOptions={["Morning", "Evening", "Night"]}
              machineLabel="Shift"
            />
          </div>

          {/* TABLE */}
          <UsersTable />
        </div>
      </section>
    </div>
  );
};

export default Users;