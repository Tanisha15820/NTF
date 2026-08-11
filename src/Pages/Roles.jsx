import { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { lmsMenus } from "../Data/LMSMenu";

import {
  ShieldCheck,
  Plus,
  Search,
  ChevronRight,
  LayoutDashboard,
  BookOpen,
  Building2,
  Users,
  FileText,
  UserCog,
  Check,
  Edit3,
} from "lucide-react";

const rolesData = [
  {
    id: 1,
    name: "Admin",
    shortName: "AD",
    icon: ShieldCheck,
    color: "#f59e0b",
    users: 4,
    type: "System",
    description: "Full system access with complete management capabilities",
  },
  {
    id: 2,
    name: "HR & Admin",
    shortName: "HR",
    icon: Users,
    color: "#10b981",
    users: 6,
    type: "Custom",
    description: "Manage employees, departments and HR operations",
  },
];

const moduleData = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Access to dashboard and analytics",
    icon: LayoutDashboard,
    permissions: ["View", "Create", "Edit", "Delete"],
  },
  {
    id: "courses",
    title: "Courses",
    description: "Manage courses and learning content",
    icon: BookOpen,
    permissions: ["View", "Create", "Edit", "Delete"],
  },
  {
    id: "department",
    title: "Department",
    description: "Manage department hierarchy",
    icon: Building2,
    permissions: ["View", "Create", "Edit", "Delete"],
  },
  {
    id: "employees",
    title: "Employees",
    description: "Employee information management",
    icon: Users,
    permissions: ["View", "Create", "Edit", "Delete"],
  },
  {
    id: "operators",
    title: "Operators",
    description: "Manage operational users",
    icon: UserCog,
    permissions: ["View", "Create", "Edit", "Delete"],
  },
  {
    id: "test-paper",
    title: "Test Paper",
    description: "Create and manage test papers",
    icon: FileText,
    permissions: ["View", "Create", "Edit", "Delete"],
  },

];

const defaultPermissions = moduleData.reduce((acc, module) => {
  acc[module.id] = {
    View: true,
    Create: true,
    Edit: true,
    Delete: true,
  };

  return acc;
}, {});

const Roles = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Roles & Permissions");

  const [selectedRoleId, setSelectedRoleId] = useState(1);

  const [searchRole, setSearchRole] = useState("");

  const [activeTab, setActiveTab] = useState("Permissions");

  const [permissions, setPermissions] = useState(defaultPermissions);

  const [searchPermission, setSearchPermission] = useState("");

  const [roleStatus, setRoleStatus] = useState(true);

  const selectedRole =
    rolesData.find((role) => role.id === selectedRoleId) || rolesData[0];

  const filteredRoles = useMemo(() => {
    return rolesData.filter((role) =>
      role.name.toLowerCase().includes(searchRole.toLowerCase())
    );
  }, [searchRole]);

  const filteredModules = useMemo(() => {
    return moduleData.filter((module) => {
      const value = searchPermission.toLowerCase();

      return (
        module.title.toLowerCase().includes(value) ||
        module.description.toLowerCase().includes(value)
      );
    });
  }, [searchPermission]);

  const togglePermission = (moduleId, permissionName) => {
    setPermissions((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permissionName]: !prev[moduleId][permissionName],
      },
    }));
  };

  const toggleAllForModule = (moduleId) => {
    const current = permissions[moduleId];

    const allEnabled = Object.values(current).every(Boolean);

    setPermissions((prev) => ({
      ...prev,
      [moduleId]: {
        View: !allEnabled,
        Create: !allEnabled,
        Edit: !allEnabled,
        Delete: !allEnabled,
      },
    }));
  };

  const getPermissionCount = (moduleId) => {
    return Object.values(permissions[moduleId]).filter(Boolean).length;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FB] text-gray-800">
      {/* SIDEBAR */}
      <Sidebar
        menuItems={lmsMenus}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* NAVBAR */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Navbar
            setMobileOpen={setMobileOpen}
            activeMenu={activeMenu}
          />
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-6">

            {/* PAGE HEADER */}
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light to-primary-dark text-white shadow-sm">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h1 className="text-base font-bold text-gray-900 sm:text-lg">
                    Roles & Permissions
                  </h1>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Manage roles and control access to features and modules
                  </p>
                </div>
              </div>

              <button
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-dark"
                onClick={() => alert("Create New Role")}
              >
                <Plus size={16} />
                Create New Role
              </button>
            </div>

            {/* MAIN ROLE WORKSPACE */}
            <div className="grid min-h-[650px] grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">

              {/* LEFT ROLE LIST */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                {/* ROLE HEADER */}
                <div className="border-b border-gray-100 px-4 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900">
                        Roles
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {rolesData.length}
                        </span>
                      </h2>
                    </div>

                    <button
                      onClick={() => alert("Create New Role")}
                      className="flex items-center gap-1 rounded-md border border-primary/30 px-2.5 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5"
                    >
                      <Plus size={14} />
                      New Role
                    </button>
                  </div>

                  {/* SEARCH */}
                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      value={searchRole}
                      onChange={(e) => setSearchRole(e.target.value)}
                      placeholder="Search roles..."
                      className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-9 pr-3 text-xs outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                </div>

                {/* ROLE ITEMS */}
                <div className="space-y-2 p-3">
                  {filteredRoles.map((role) => {
                    const active = role.id === selectedRoleId;

                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRoleId(role.id)}
                        className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                          active
                            ? "border-primary bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                            : "border-transparent bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
                        }`}
                      >
                        {/* ROLE ICON */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            active
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                          style={
                            !active
                              ? {
                                  borderLeft: `3px solid ${role.color}`,
                                }
                              : {}
                          }
                        >
                          <role.icon size={18} strokeWidth={2.5} />
                        </div>

                        {/* DETAILS */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p
                              className={`truncate text-sm font-bold ${
                                active
                                  ? "text-white"
                                  : "text-gray-800"
                              }`}
                            >
                              {role.name}
                            </p>

                            {role.type === "System" && (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                  active
                                    ? "bg-white/20 text-white"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                System
                              </span>
                            )}
                          </div>

                          <p
                            className={`mt-0.5 text-xs ${
                              active
                                ? "text-white/75"
                                : "text-gray-400"
                            }`}
                          >
                            {role.users} users
                          </p>
                        </div>

                        <ChevronRight
                          size={16}
                          className={
                            active
                              ? "text-white"
                              : "text-gray-300 group-hover:text-primary"
                          }
                        />
                      </button>
                    );
                  })}

                  {filteredRoles.length === 0 && (
                    <div className="py-10 text-center text-xs text-gray-400">
                      No roles found
                    </div>
                  )}
                </div>

                {/* FOOTER */}
                <div className="border-t border-gray-100 px-4 py-3">
                  <p className="text-xs text-gray-400">
                    Showing {filteredRoles.length} of {rolesData.length} roles
                  </p>
                </div>
              </div>

              {/* RIGHT ROLE DETAILS */}
              <div className="min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm">

                {/* ROLE TOP */}
                <div className="border-b border-gray-100 px-5 py-4">

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
                        style={{
                          backgroundColor: selectedRole.color,
                        }}
                      >
                        <selectedRole.icon size={22} strokeWidth={2.5} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-bold text-gray-900">
                            {selectedRole.name}
                          </h2>

                          {selectedRole.type === "System" && (
                            <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                              System Role
                            </span>
                          )}
                        </div>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {selectedRole.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-primary">
                        <Edit3 size={14} />
                        Edit Role
                      </button>

                      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-gray-300 hover:bg-gray-50 hover:text-primary">
                        •••
                      </button>
                    </div>
                  </div>

                  {/* ROLE META */}
                  <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white px-4 py-3 shadow-sm transition hover:border-primary/20 hover:shadow-md">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Role Type
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-800">
                        {selectedRole.type} Role
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white px-4 py-3 shadow-sm transition hover:border-primary/20 hover:shadow-md">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Users
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-800">
                        {selectedRole.users} Users
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white px-4 py-3 shadow-sm transition hover:border-primary/20 hover:shadow-md">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Status
                      </p>

                      <button
                        onClick={() => setRoleStatus(!roleStatus)}
                        className="mt-1 flex items-center gap-1.5"
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            roleStatus
                              ? "bg-emerald-500"
                              : "bg-gray-300"
                          }`}
                        />

                        <span className="text-xs font-semibold text-gray-800">
                          {roleStatus ? "Active" : "Inactive"}
                        </span>
                      </button>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white px-4 py-3 shadow-sm transition hover:border-primary/20 hover:shadow-md">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Permission Access
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-800">
                        Full Access
                      </p>
                    </div>
                  </div> 
                </div>

                {/* TABS */}
                <div className="border-b border-gray-100 px-5">
                  <div className="flex gap-6">
                    {["Pages", "Permissions"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative py-3 text-xs font-semibold transition ${
                          activeTab === tab
                            ? "text-primary"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {tab}

                        {activeTab === tab && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  {activeTab === "Pages" && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InfoCard
                        icon={ShieldCheck}
                        title="Dashboard"
                        value="Full system access"
                      />

                      <InfoCard
                        icon={Users}
                        title="Courses"
                        value={`${selectedRole.users} courses`}
                      />

                      <InfoCard
                        icon={LayoutDashboard}
                        title="Department"
                        value={`${moduleData.length} department`}
                      />

                      <InfoCard
                        icon={Check}
                        title="Operators"
                        value="All operators"
                      />
                    </div>
                  )}

                  {activeTab === "Users" && (
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">
                            Assigned Users
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-400">
                            Users currently assigned to this role
                          </p>
                        </div>

                        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark">
                          <Plus size={14} />
                          Add User
                        </button>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {[
                          "Tanisha Arora",
                          "Rahul Sharma",
                          "Priya Singh",
                          "Amit Kumar",
                        ].map((user, index) => (
                          <div
                            key={user}
                            className="flex items-center justify-between px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                {user
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {user}
                                </p>
                                <p className="text-xs text-gray-400">
                                  admin{index + 1}@ntf.com
                                </p>
                              </div>
                            </div>

                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                              Active
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "Permissions" && (
                    <>
                      {/* TOOLBAR */}
                      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                        <div className="relative max-w-[350px] flex-1">
                          <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            value={searchPermission}
                            onChange={(e) =>
                              setSearchPermission(e.target.value)
                            }
                            placeholder="Search permissions..."
                            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-9 pr-3 text-xs outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = {};

                              moduleData.forEach((module) => {
                                updated[module.id] = {
                                  View: true,
                                  Create: true,
                                  Edit: true,
                                  Delete: true,
                                };
                              });

                              setPermissions(updated);
                            }}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                          >
                            Enable All
                          </button>

                          <button
                            onClick={() => {
                              const updated = {};

                              moduleData.forEach((module) => {
                                updated[module.id] = {
                                  View: false,
                                  Create: false,
                                  Edit: false,
                                  Delete: false,
                                };
                              });

                              setPermissions(updated);
                            }}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                          >
                            Disable All
                          </button>
                        </div>
                      </div>

                      {/* MODULE GRID */}
                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredModules.map((module) => {
                          const Icon = module.icon;

                          const enabledCount =
                            getPermissionCount(module.id);

                          const allEnabled =
                            enabledCount === module.permissions.length;

                          return (
                            <div
                              key={module.id}
                              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                            >
                              {/* MODULE HEADER */}
                              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-3 py-3">

                                <div className="flex min-w-0 items-center gap-2">
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon size={15} />
                                  </div>

                                  <div className="min-w-0">
                                    <h3 className="truncate text-xs font-bold text-gray-800">
                                      {module.title}
                                    </h3>

                                    <p className="truncate text-[11px] text-gray-400">
                                      {module.description}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  onClick={() =>
                                    toggleAllForModule(module.id)
                                  }
                                  className={`ml-2 shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold transition ${
                                    allEnabled
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-gray-100 text-gray-500"
                                  }`}
                                >
                                  {enabledCount}/{module.permissions.length}
                                </button>
                              </div>

                              {/* PERMISSIONS */}
                              <div className="grid grid-cols-2 gap-2 p-3">
                                {module.permissions.map((permission) => {
                                  const enabled =
                                    permissions[module.id][permission];

                                  return (
                                    <button
                                      key={permission}
                                      onClick={() =>
                                        togglePermission(
                                          module.id,
                                          permission
                                        )
                                      }
                                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all ${
                                        enabled
                                          ? "border-primary/30 bg-primary/5 hover:border-primary/50"
                                          : "border-gray-100 bg-gray-50/50 hover:border-primary/30 hover:bg-white hover:shadow-sm"
                                      }`}
                                    >
                                      <span
                                        className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${
                                          enabled
                                            ? "border-primary bg-primary text-white"
                                            : "border-gray-300 bg-white"
                                        }`}
                                      >
                                        {enabled && <Check size={12} />}
                                      </span>

                                      <span
                                        className={`text-xs font-semibold ${
                                          enabled
                                            ? "text-primary"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        {permission}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {filteredModules.length === 0 && (
                        <div className="rounded-xl border border-dashed border-gray-200 py-12 text-center">
                          <Search
                            size={28}
                            className="mx-auto mb-2 text-gray-300"
                          />

                          <p className="text-sm font-semibold text-gray-600">
                            No permissions found
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Try searching for another module
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* FOOTER */}
                {activeTab === "Permissions" && (
                  <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShieldCheck size={14} />
                      </div>

                      <p className="text-xs text-gray-500">
                        Permission changes are applied to this role.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50">
                        Cancel
                      </button>

                      <button className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-dark">
                        Update Role
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        <Icon size={20} strokeWidth={2.5} />
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </p>
        <p className="mt-1 text-sm font-bold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Roles;
