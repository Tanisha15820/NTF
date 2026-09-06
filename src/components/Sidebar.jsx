import { useEffect } from "react";
import logo from "../assets/images/NTF_logo_black.png";
import sidebarBg from "../assets/images/sidebar_bg.png";
import { Menu, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  activeMenu,
  setActiveMenu,
  menuItems = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 1024 && !collapsed) {
      setCollapsed(true);
    }
  }, []);

  return (
    <>
      {mobileOpen && !collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => {
            setCollapsed(true);
            setMobileOpen(false);
          }}
        />
      )}

      <aside
        className={`relative flex h-screen flex-col overflow-hidden border-r border-gray-200 bg-gradient-to-b from-white via-white to-primary/5 shadow-xl transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Sidebar Background Image */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${sidebarBg})`,
          }}
        />

        {/* Sidebar Content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <div
            className={`flex h-16 shrink-0 items-center border-b border-gray-100 ${
              collapsed ? "justify-center px-2" : "justify-between px-4"
            }`}
          >
            {!collapsed && (
              <div className="flex items-center gap-2.5">
                {/* Logo */}
                <div className="flex items-center">
                  <img
                    src={logo}
                    alt="NTF Logo"
                    className="h-16 object-contain drop-shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Collapse Button */}
            <button
              onClick={() => {
                setCollapsed(!collapsed);
                setMobileOpen(true);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg p-2 text-primary transition-all hover:bg-primary/10 hover:text-primary"
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? (
                <ChevronsRight size={20} />
              ) : (
                <ChevronsLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3">
            {menuItems.map((item) => {
              const active =
                activeMenu === item.name ||
                (item.path && location.pathname === item.path);

              return (
                <div key={item.name} className="group relative">
                  {/* Active Indicator */}
                  {active && !collapsed && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-primary-light to-primary-dark" />
                  )}

                  <button
                    onClick={() => {
                      setActiveMenu(item.name);

                      if (item.path) {
                        navigate(item.path);
                      }

                      if (window.innerWidth < 1024) {
                        setCollapsed(true);
                      }
                    }}
                    className={`flex w-full items-center rounded-xl py-2.5 transition-all duration-200 ${
                      collapsed ? "justify-center" : "gap-3 px-3"
                    } ${
                      active
                        ? "bg-gradient-to-r from-primary/15 to-primary/5 font-semibold text-primary shadow-[inset_0_0_0_1px_rgba(111,74,231,0.15)]"
                        : "text-gray-500 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {/* Menu Icon */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                        active
                          ? "bg-gradient-to-br from-primary-light to-primary-dark text-white shadow-md shadow-primary/30"
                          : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                      } ${collapsed ? "mx-auto" : ""}`}
                    >
                      {item.icon}
                    </div>

                    {/* Menu Name */}
                    {!collapsed && (
                      <span className="whitespace-nowrap text-sm">
                        {item.name}
                      </span>
                    )}

                    {/* Right Dot */}
                    {!active && !collapsed && item.name && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gray-200 transition-colors group-hover:bg-primary/40" />
                    )}
                  </button>

                  {/* Tooltip when Collapsed */}
                  {collapsed && (
                    <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      <div className="whitespace-nowrap rounded-lg bg-dark px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                        {item.name}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
