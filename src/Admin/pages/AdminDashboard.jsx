import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [cows, setCows] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  // =========================================
  // FETCH JSON HELPER
  // =========================================
  const fetchJSON = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`API Error: ${url}`, response.status);
        return [];
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        console.error(`Invalid JSON response: ${url}`);
        return [];
      }

      const data = await response.json();

      // API returns array directly
      if (Array.isArray(data)) {
        return data;
      }

      // API returns { data: [] }
      if (Array.isArray(data.data)) {
        return data.data;
      }

      // API returns { users: [] }
      if (Array.isArray(data.users)) {
        return data.users;
      }

      // API returns { cows: [] }
      if (Array.isArray(data.cows)) {
        return data.cows;
      }

      // API returns { contacts: [] }
      if (Array.isArray(data.contacts)) {
        return data.contacts;
      }

      return [];
    } catch (error) {
      console.error(`Failed to fetch: ${url}`, error);
      return [];
    }
  };

  // =========================================
  // FETCH DASHBOARD DATA
  // =========================================
  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      const [cowsData, usersData, contactsData] = await Promise.all([
        fetchJSON("http://localhost:5000/api/cows"),
        fetchJSON("http://localhost:5000/api/users"),
        fetchJSON("http://localhost:5000/api/contact"),
      ]);

      setCows(cowsData);
      setUsers(usersData);
      setContacts(contactsData);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOAD DATA
  // =========================================
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =========================================
  // LOGOUT
  // =========================================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================================
  // COW STATISTICS
  // =========================================
  const totalCows = cows.length;

  const availableCows = cows.filter(
    (cow) =>
      String(cow.status || "").toLowerCase() === "available"
  ).length;

  const soldCows = cows.filter(
    (cow) =>
      String(cow.status || "").toLowerCase() === "sold"
  ).length;

  const featuredCows = cows.filter(
    (cow) =>
      cow.featured === true ||
      cow.featured === "true"
  ).length;

  // =========================================
  // MEDIA URL
  // =========================================
  const getMediaUrl = (filePath) => {
    if (!filePath) {
      return "https://via.placeholder.com/300x200?text=No+Image";
    }

    if (filePath.startsWith("http")) {
      return filePath;
    }

    let cleanPath = filePath.replace(/\\/g, "/");

    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.slice(1);
    }

    if (cleanPath.startsWith("uploads/")) {
      return `http://localhost:5000/${cleanPath}`;
    }

    return `http://localhost:5000/uploads/${cleanPath}`;
  };

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#1E5631] border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-4 sm:p-6 lg:p-8">

      {/* =========================================
          HEADER
      ========================================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-sm text-[#A36A1F] font-semibold uppercase tracking-widest">
              Shahan Cattle Farm
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#1E5631] mt-1">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your cattle, users and customer inquiries from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => navigate("/admin/add-cow")}
              className="px-5 py-2.5 rounded-xl bg-[#1E5631] text-white font-semibold hover:bg-[#164225] transition cursor-pointer"
            >
              + Add Cow
            </button>

            <button
              onClick={() => navigate("/admin/all-cows")}
              className="px-5 py-2.5 rounded-xl bg-[#A36A1F] text-white font-semibold hover:bg-[#895719] transition cursor-pointer"
            >
              View Cows
            </button>

            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>

          </div>

        </div>
      </div>

      {/* =========================================
          MAIN COW STATISTICS
      ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        {/* TOTAL COWS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Cows
              </p>

              <h2 className="text-3xl font-bold text-[#1E5631] mt-2">
                {totalCows}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                All cattle inventory
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
              🐄
            </div>

          </div>
        </div>

        {/* AVAILABLE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Available Cows
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {availableCows}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Currently available
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
              ✅
            </div>

          </div>
        </div>

        {/* SOLD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Sold Cows
              </p>

              <h2 className="text-3xl font-bold text-red-500 mt-2">
                {soldCows}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Successfully sold
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl">
              💰
            </div>

          </div>
        </div>

        {/* FEATURED */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Featured Cows
              </p>

              <h2 className="text-3xl font-bold text-amber-500 mt-2">
                {featuredCows}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Featured cattle
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
              ⭐
            </div>

          </div>
        </div>

      </div>

      {/* =========================================
          USERS + CONTACTS + SOLD
      ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        {/* USERS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Registered Users
              </p>

              <h3 className="text-3xl font-bold text-gray-800">
                {users.length}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Total registered users
              </p>
            </div>

          </div>

        </div>

        {/* CONTACTS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              ✉️
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Contact Inquiries
              </p>

              <h3 className="text-3xl font-bold text-gray-800">
                {contacts.length}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Customer messages
              </p>
            </div>

          </div>

        </div>

        {/* SOLD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
              🏷️
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Sold Cattle
              </p>

              <h3 className="text-3xl font-bold text-red-500">
                {soldCows}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Total sold cows
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          QUICK ACTIONS
      ========================================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-[#1E5631]">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Quickly access important admin sections.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* ADD COW */}
          <button
            onClick={() => navigate("/admin/add-cow")}
            className="p-5 rounded-xl border border-green-100 bg-green-50 text-left hover:bg-green-100 transition cursor-pointer"
          >
            <div className="text-2xl mb-2">
              ➕
            </div>

            <h3 className="font-bold text-[#1E5631]">
              Add New Cow
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Add cattle to inventory
            </p>
          </button>

          {/* ALL COWS */}
          <button
            onClick={() => navigate("/admin/all-cows")}
            className="p-5 rounded-xl border border-blue-100 bg-blue-50 text-left hover:bg-blue-100 transition cursor-pointer"
          >
            <div className="text-2xl mb-2">
              🐄
            </div>

            <h3 className="font-bold text-blue-800">
              All Cows
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              View and manage cattle
            </p>
          </button>

          {/* USERS */}
          <button
            onClick={() => navigate("/admin/users")}
            className="p-5 rounded-xl border border-purple-100 bg-purple-50 text-left hover:bg-purple-100 transition cursor-pointer"
          >
            <div className="text-2xl mb-2">
              👥
            </div>

            <h3 className="font-bold text-purple-800">
              All Users
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Manage registered users
            </p>
          </button>

          {/* CONTACTS */}
          <button
            onClick={() => navigate("/admin/contacts")}
            className="p-5 rounded-xl border border-orange-100 bg-orange-50 text-left hover:bg-orange-100 transition cursor-pointer"
          >
            <div className="text-2xl mb-2">
              📩
            </div>

            <h3 className="font-bold text-orange-800">
              Contact Messages
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              View customer inquiries
            </p>
          </button>

        </div>

      </div>

      {/* =========================================
          RECENT COWS + USERS
      ========================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* =====================================
            RECENT COWS
        ====================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-6 border-b flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-[#1E5631]">
                Recent Cows
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest cattle added to inventory
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/all-cows")}
              className="text-sm text-[#1E5631] font-semibold hover:underline cursor-pointer"
            >
              View All
            </button>

          </div>

          <div className="p-5">

            {cows.length === 0 ? (

              <div className="py-10 text-center text-gray-400">
                No cows available.
              </div>

            ) : (

              <div className="space-y-4">

                {cows
                  .slice(-5)
                  .reverse()
                  .map((cow) => (

                    <div
                      key={cow._id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[#F8F5EE] hover:bg-green-50 transition"
                    >

                      <img
                        src={getMediaUrl(cow.coverImage)}
                        alt={cow.name || "Cow"}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">

                        <h3 className="font-bold text-gray-800 truncate">
                          {cow.name || "Unnamed Cow"}
                        </h3>

                        <p className="text-xs text-gray-500">
                          Tag: {cow.tagNumber || "N/A"}
                        </p>

                        <div className="flex gap-3 mt-1 text-xs text-gray-500">

                          <span>
                            {cow.breed || "N/A"}
                          </span>

                          <span>
                            {cow.weight || 0} KG
                          </span>

                        </div>

                      </div>

                      <div className="text-right">

                        <span
                          className={`inline-block mt-1 px-2 py-1 rounded-full text-[10px] font-bold ${
                            String(cow.status || "")
                              .toLowerCase() === "available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {cow.status || "Available"}
                        </span>

                      </div>

                    </div>

                  ))}

              </div>

            )}

          </div>
        </div>

        {/* =====================================
            ALL / RECENT USERS
        ====================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-6 border-b flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-[#1E5631]">
                Registered Users
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                All users registered on the website
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/users")}
              className="text-sm text-[#1E5631] font-semibold hover:underline cursor-pointer"
            >
              Manage Users
            </button>

          </div>

          <div className="p-5">

            {users.length === 0 ? (

              <div className="py-10 text-center">

                <div className="text-4xl mb-3">
                  👥
                </div>

                <p className="text-gray-400">
                  No users found.
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Check your backend /api/users endpoint.
                </p>

              </div>

            ) : (

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">

                {users.map((user, index) => {

                  const userName =
                    user.name ||
                    user.username ||
                    user.fullName ||
                    "Unnamed User";

                  const firstLetter =
                    userName.charAt(0).toUpperCase();

                  return (
                    <div
                      key={user._id || user.id || index}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8F5EE] transition border border-transparent hover:border-gray-100"
                    >

                      {/* AVATAR */}
                      <div className="w-11 h-11 rounded-full bg-[#1E5631] text-white flex items-center justify-center font-bold uppercase flex-shrink-0">
                        {firstLetter}
                      </div>

                      {/* USER INFO */}
                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-gray-800 truncate">
                          {userName}
                        </h3>

                        <p className="text-xs text-gray-500 truncate">
                          {user.email || "No email"}
                        </p>

                        {user.phone && (
                          <p className="text-xs text-gray-400 mt-1">
                            {user.phone}
                          </p>
                        )}

                      </div>

                      {/* ROLE */}
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          String(user.role || "user").toLowerCase() ===
                          "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role || "User"}
                      </span>

                    </div>
                  );
                })}

              </div>

            )}

          </div>
        </div>

      </div>

      {/* =========================================
          CONTACT SUMMARY
      ========================================= */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <h2 className="text-xl font-bold text-[#1E5631]">
              Contact Messages
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Customers who contacted Shahan Cattle Farm
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="px-6 py-3 bg-purple-50 rounded-xl text-center">

              <p className="text-xs text-gray-500">
                Total Messages
              </p>

              <p className="text-2xl font-bold text-purple-600">
                {contacts.length}
              </p>

            </div>

            <button
              onClick={() => navigate("/admin/contacts")}
              className="px-5 py-3 bg-[#1E5631] text-white rounded-xl font-semibold hover:bg-[#164225] transition cursor-pointer"
            >
              View Messages
            </button>

          </div>

        </div>

      </div>

      {/* =========================================
          FOOTER
      ========================================= */}
      <div className="text-center py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Shahan Cattle Farm — Admin Panel
      </div>

    </div>
  );
}