import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

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
    {
      name: "All Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
  ];

  return (
    <>
      {/* ================= MOBILE MENU BUTTON ================= */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-[#1E5631] p-3 rounded-full text-white shadow-lg hover:bg-[#164225] transition"
      >
        <FaBars />
      </button>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72
          bg-[#1E5631] text-white shadow-2xl z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* ================= LOGO ================= */}
        <div className="h-24 flex items-center justify-center border-b border-green-700 relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-wide">
              Shahan Cattle
            </h2>

            <p className="text-green-200 text-sm mt-1">
              Admin Panel
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden absolute right-4 top-7 text-xl text-green-100 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* ================= ADMIN INFO ================= */}
        <div className="mx-4 mt-6 p-4 rounded-xl bg-green-800/50 border border-green-700">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold">
              A
            </div>

            <div>
              <p className="font-semibold">
                Administrator
              </p>

              <p className="text-xs text-green-200">
                Farm Management
              </p>
            </div>
          </div>
        </div>

        {/* ================= MENU ================= */}
        <nav className="mt-8 px-4 space-y-2">
          <p className="text-xs uppercase tracking-widest text-green-300 px-4 mb-3">
            Main Menu
          </p>

          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                px-5 py-4
                rounded-xl
                transition-all duration-300
                group
                ${
                  isActive
                    ? "bg-[#D4AF37] text-black font-semibold shadow-lg"
                    : "text-white hover:bg-green-700"
                }
                `
              }
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="absolute bottom-8 w-full px-4">
          <button
            onClick={logout}
            className="
              w-full
              flex items-center justify-center gap-3
              bg-red-600
              hover:bg-red-700
              py-3.5
              rounded-xl
              font-semibold
              transition
              shadow-lg
              cursor-pointer
            "
          >
            <FaSignOutAlt />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}