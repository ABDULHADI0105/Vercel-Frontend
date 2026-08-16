import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // EDIT STATES
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });

  // =========================================
  // FETCH USERS
  // =========================================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/users`);

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let message = `Server error: ${response.status}`;

        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          message = errorData.message || message;
        }

        throw new Error(message);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Users fetch error:", error);
      setError(error.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================================
  // OPEN EDIT MODAL
  // =========================================
  const handleEdit = (user) => {
    setEditingUser(user);

    setEditForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "user",
    });

    setShowEditModal(true);
  };

  // =========================================
  // EDIT INPUT
  // =========================================
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // UPDATE USER
  // =========================================
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (!editingUser?._id) {
      alert("User ID not found.");
      return;
    }

    try {
      setEditLoading(true);

      const response = await fetch(
        `${API_URL}/api/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      const contentType = response.headers.get("content-type");

      let data = {};

      if (contentType?.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user."
        );
      }

      const updatedUser = data.user || data.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id
            ? updatedUser || {
                ...user,
                ...editForm,
              }
            : user
        )
      );

      alert("User updated successfully!");

      setShowEditModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Update user error:", error);

      alert(
        error.message ||
          "Something went wrong while updating user."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // =========================================
  // DELETE USER
  // =========================================
  const handleDelete = async (id) => {
    if (!id) {
      alert("User ID not found.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const contentType =
        response.headers.get("content-type");

      let data = {};

      if (contentType?.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete user."
        );
      }

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user._id !== id
        )
      );

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Delete user error:", error);

      alert(
        error.message ||
          "Something went wrong while deleting user."
      );
    }
  };

  // =========================================
  // SEARCH
  // =========================================
  const searchText = search.toLowerCase().trim();

  const filteredUsers = users.filter((user) => {
    const name =
      user.name ||
      user.username ||
      user.fullName ||
      "";

    const email = user.email || "";
    const phone = user.phone || "";

    return (
      name.toLowerCase().includes(searchText) ||
      email.toLowerCase().includes(searchText) ||
      phone.toLowerCase().includes(searchText)
    );
  });

  // =========================================
  // COUNTS
  // =========================================
  const adminCount = users.filter(
    (user) =>
      String(user.role || "").toLowerCase() ===
      "admin"
  ).length;

  const customerCount = users.filter(
    (user) =>
      String(user.role || "user").toLowerCase() !==
      "admin"
  ).length;

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#1E5631] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-600 font-medium">
            Loading Users...
          </p>
        </div>
      </div>
    );
  }

  // =========================================
  // PAGE
  // =========================================
  return (
    <div className="min-h-screen bg-[#F8F5EE] p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-sm text-[#A36A1F] font-semibold uppercase tracking-widest">
              Shahan Cattle Farm
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#1E5631] mt-1">
              Registered Users
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all registered users.
            </p>
          </div>

          <button
            onClick={fetchUsers}
            className="px-5 py-2.5 bg-[#1E5631] text-white rounded-xl font-semibold hover:bg-[#164225] transition cursor-pointer"
          >
            🔄 Refresh
          </button>

        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6">
          <p className="font-semibold">
            Unable to load users
          </p>

          <p className="text-sm mt-1">
            {error}
          </p>

          <p className="text-xs mt-2">
            API: {API_URL}/api/users
          </p>
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
              👥
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800">
                {users.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">
              🛡️
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Admins
              </p>

              <h2 className="text-3xl font-bold text-red-500">
                {adminCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              👤
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Customers
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {customerCount}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
          />

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-5 sm:p-6 border-b">

          <h2 className="text-xl font-bold text-[#1E5631]">
            All Users
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredUsers.length} of{" "}
            {users.length} users
          </p>

        </div>

        {filteredUsers.length === 0 ? (

          <div className="py-16 text-center">

            <div className="text-5xl mb-4">
              👥
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No Users Found
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              There are no registered users to display.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="bg-[#F8F5EE]">

                <tr>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    User
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Registered
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredUsers.map((user, index) => {

                  const userName =
                    user.name ||
                    user.username ||
                    user.fullName ||
                    "Unnamed User";

                  const initial =
                    userName
                      .charAt(0)
                      .toUpperCase();

                  const isAdmin =
                    String(user.role || "user")
                      .toLowerCase() ===
                    "admin";

                  const registeredDate =
                    user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString(
                          "en-PK",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A";

                  return (

                    <tr
                      key={
                        user._id ||
                        user.id ||
                        index
                      }
                      className="hover:bg-[#F8F5EE] transition"
                    >

                      {/* USER */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-full bg-[#1E5631] text-white flex items-center justify-center font-bold flex-shrink-0">
                            {initial}
                          </div>

                          <div>

                            <p className="font-semibold text-gray-800">
                              {userName}
                            </p>

                            <p className="text-xs text-gray-400">
                              User #{index + 1}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {user.email || "No email"}
                        </span>
                      </td>

                      {/* PHONE */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {user.phone || "No phone"}
                        </span>
                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            isAdmin
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isAdmin
                            ? "Admin"
                            : "User"}
                        </span>

                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-500">
                          {registeredDate}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">

                        <div className="flex items-center justify-end gap-2">

                          {/* EDIT */}
                          <button
                            onClick={() =>
                              handleEdit(user)
                            }
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                          >
                            ✏️ Edit
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                user._id
                              )
                            }
                            disabled={isAdmin}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                              isAdmin
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                            }`}
                          >
                            🗑️ Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* FOOTER */}
      <div className="text-center py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Shahan Cattle Farm — Admin Panel
      </div>

      {/* =========================================
          EDIT MODAL
      ========================================= */}
      {showEditModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              !editLoading &&
              setShowEditModal(false)
            }
          />

          {/* Modal */}
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="bg-[#1E5631] px-6 py-5 text-white flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Edit User
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Update user information
                </p>
              </div>

              <button
                type="button"
                disabled={editLoading}
                onClick={() =>
                  setShowEditModal(false)
                }
                className="text-white text-2xl hover:text-gray-200 cursor-pointer"
              >
                ×
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdateUser}
              className="p-6 space-y-5"
            >

              {/* NAME */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
                />

              </div>

              {/* PHONE */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E5631]"
                />

              </div>

              {/* ROLE */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>

                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E5631] bg-white"
                >

                  <option value="user">
                    User
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  disabled={editLoading}
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-3 rounded-xl bg-[#1E5631] text-white font-semibold hover:bg-[#164225] transition cursor-pointer disabled:opacity-60"
                >
                  {editLoading
                    ? "Updating..."
                    : "Update User"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}