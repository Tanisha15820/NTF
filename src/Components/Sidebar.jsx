import logo from "../assets/images/NTF_logo_black.png";
import { Menu, X } from "lucide-react";
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

  return (
    <>
      {mobileOpen && !collapsed && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => {
            setCollapsed(true);
            setMobileOpen(false);
          }}
        />
      )}

      <aside
        className={`relative h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div
          className={`h-16 border-b border-gray-100 flex items-center ${
            collapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          {!collapsed && (
            <img src={logo} alt="logo" className="h-14 object-contain" />
          )}

          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setMobileOpen(true);
            }}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {collapsed ? <Menu size={22} /> : <X size={22} />}
          </button>
        </div>

        <div className="mt-5 px-3 overflow-y-auto">
          {menuItems.map((item) => {
            const active =
              activeMenu === item.name ||
              (item.path && location.pathname === item.path);

            return (
              <div key={item.name} className="mb-2">
                <button
                  onClick={() => {
                    setActiveMenu(item.name);

                    if (item.path) navigate(item.path);

                    if (window.innerWidth < 1024) {
                      setCollapsed(true);
                    }
                  }}
                  className={`w-full flex items-center rounded-xl py-3 transition-all
                  ${collapsed ? "justify-center" : "justify-between px-3"}
                  ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <div
                    className={`flex items-center ${collapsed ? "" : "gap-3"}`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg
                      ${active ? "bg-primary/20" : "bg-gray-100"}`}
                    >
                      {item.icon}
                    </div>

                    {!collapsed && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
