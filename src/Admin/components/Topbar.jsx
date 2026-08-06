import { FaBars, FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-md border-b border-gray-200">
      <div className="h-20 flex items-center justify-between px-4 md:px-8">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-10 h-10 rounded-lg bg-[#1E5631] text-white flex items-center justify-center"
          >
            <FaBars />
          </button>

          <div>
            <h2 className="text-2xl font-bold text-[#1E5631]">
              Admin Dashboard
            </h2>

            <p className="text-sm text-gray-500 hidden sm:block">
              Welcome Back, Admin 👋
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">

            <FaSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-44"
            />

          </div>

          {/* Notification */}
          <button className="relative w-11 h-11 rounded-full bg-gray-100 hover:bg-[#1E5631] hover:text-white duration-300 flex items-center justify-center">

            <FaBell />

            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

          </button>

          {/* Admin */}
          <div className="hidden sm:flex items-center gap-3">

            <img
              src="https://ui-avatars.com/api/?name=Admin&background=1E5631&color=fff"
              alt="admin"
              className="w-11 h-11 rounded-full"
            />

            <div>

              <h4 className="font-semibold text-gray-800">
                Administrator
              </h4>

              <p className="text-xs text-gray-500">
                Shahan Cattle Farm
              </p>

            </div>

          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 duration-300"
          >
            <FaSignOutAlt />

            <span className="hidden md:block">
              Logout
            </span>

          </button>

        </div>

      </div>
    </header>
  );
}