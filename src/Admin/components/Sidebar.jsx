import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
    },
    {
      name: "Add Cow",
      icon: <FaPlusCircle />,
      path: "/admin/add-cow",
    },
    {
      name: "All Cows",
      icon: <FaClipboardList />,
      path: "/admin/all-cows",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-[#1E5631] p-3 rounded-full text-white"
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-[#1E5631] text-white shadow-2xl z-50 transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-24 flex items-center justify-center border-b border-green-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Shahan Cattle</h2>
            <p className="text-green-200 text-sm">Admin Panel</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-10 px-4 space-y-3">
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#D4AF37] text-black font-semibold"
                    : "hover:bg-green-700"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-8 w-full px-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}