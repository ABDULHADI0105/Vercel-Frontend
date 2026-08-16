import { useState, useEffect } from "react";
import API from "../../api/axios";

export default function AllCows() {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedCow, setSelectedCow] = useState(null);
  const [editingCow, setEditingCow] = useState(null);

  // File states
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [newVideo, setNewVideo] = useState(null);

  // ==========================================
  // FETCH ALL COWS
  // ==========================================
  const fetchCows = async () => {
    try {
      setLoading(true);

      const response = await API.get("/api/cows");

      setCows(response.data || []);
    } catch (error) {
      console.error("Error fetching cows:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load cows. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCows();
  }, []);

  // ==========================================
  // MEDIA URL
  // ==========================================
  const getMediaUrl = (filePath) => {
    if (!filePath) return "";

    // Already complete URL
    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://")
    ) {
      return filePath;
    }

    let cleanPath = filePath.replace(/\\/g, "/");

    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.slice(1);
    }

    // Railway backend URL
    const BACKEND_URL =
      "https://vercel-backend-production-d74f.up.railway.app";

    if (cleanPath.startsWith("uploads/")) {
      return `${BACKEND_URL}/${cleanPath}`;
    }

    return `${BACKEND_URL}/uploads/${cleanPath}`;
  };

  // ==========================================
  // DELETE COW
  // ==========================================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cow?")) {
      return;
    }

    try {
      await API.delete(`/api/cows/${id}`);

      alert("Cow deleted successfully!");

      setCows((prevCows) =>
        prevCows.filter((cow) => cow._id !== id)
      );
    } catch (error) {
      console.error("Error deleting cow:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete cow."
      );
    }
  };

  // ==========================================
  // UPDATE COW
  // ==========================================
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", editingCow.name || "");
      formData.append("tagNumber", editingCow.tagNumber || "");
      formData.append("breed", editingCow.breed || "");
      formData.append(
        "gender",
        editingCow.gender || "Male"
      );

      formData.append(
        "age",
        Number(editingCow.age) || 0
      );

      formData.append(
        "weight",
        Number(editingCow.weight) || 0
      );

      formData.append(
        "height",
        Number(editingCow.height) || 0
      );

      formData.append(
        "color",
        editingCow.color || ""
      );

      formData.append(
        "price",
        Number(editingCow.price) || 0
      );

      formData.append(
        "healthStatus",
        editingCow.healthStatus || ""
      );

      formData.append(
        "feedType",
        editingCow.feedType || ""
      );

      formData.append(
        "status",
        editingCow.status || "Available"
      );

      formData.append(
        "shortDescription",
        editingCow.shortDescription || ""
      );

      formData.append(
        "description",
        editingCow.description || ""
      );

      // New Cover Image
      if (newCoverImage) {
        formData.append(
          "coverImage",
          newCoverImage
        );
      }

      // New Video
      if (newVideo) {
        formData.append(
          "video",
          newVideo
        );
      }

      // Railway PUT request
      const response = await API.put(
        `/api/cows/${editingCow._id}`,
        formData
      );

      alert(
        response.data?.message ||
          "Cow updated successfully!"
      );

      // Close modal
      setEditingCow(null);

      // Reset files
      setNewCoverImage(null);
      setNewVideo(null);

      // Refresh cows
      fetchCows();
    } catch (error) {
      console.error(
        "Error updating cow:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while updating."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E5631]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-6">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E5631]">
            All Cows Inventory
          </h1>

          <p className="text-gray-500 mt-1">
            Manage, view, edit or delete your listed farm animals.
          </p>
        </div>

        <span className="bg-[#1E5631] text-white px-4 py-2 rounded-xl font-semibold shadow">
          Total Cows: {cows.length}
        </span>
      </div>

      {/* ==========================================
          COWS GRID
      ========================================== */}
      {cows.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            No cows found in the database. Please add some!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {cows.map((cow) => (
            <div
              key={cow._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between border border-gray-100 hover:shadow-xl transition duration-300"
            >

              {/* IMAGE */}
              <div className="relative h-52 bg-gray-200">
                <img
                  src={
                    cow.coverImage
                      ? getMediaUrl(cow.coverImage)
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={cow.name}
                  className="w-full h-full object-cover"
                />

                {/* STATUS */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    cow.status === "Available"
                      ? "bg-green-600"
                      : "bg-red-500"
                  }`}
                >
                  {cow.status || "Available"}
                </span>

                {/* FEATURED */}
                {cow.featured && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                    Featured
                  </span>
                )}
              </div>

              {/* CARD BODY */}
              <div className="p-5 flex-1 flex flex-col justify-between">

                <div>
                  <div className="flex justify-between items-start mb-2">

                    <h3 className="text-xl font-bold text-[#1E5631]">
                      {cow.name || "Unnamed Cow"}
                    </h3>

                    <span className="text-sm font-semibold text-gray-500">
                      Tag: {cow.tagNumber}
                    </span>

                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cow.shortDescription ||
                      "No description provided."}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 bg-[#F8F5EE] p-3 rounded-xl mb-4">

                    <div>
                      <strong>Breed:</strong>{" "}
                      {cow.breed || "N/A"}
                    </div>

                    <div>
                      <strong>Age:</strong>{" "}
                      {cow.age || 0} Years
                    </div>

                    <div>
                      <strong>Weight:</strong>{" "}
                      {cow.weight || 0} KG
                    </div>

                    <div>
                      <strong>Price:</strong>{" "}
                      PKR {cow.price || 0}
                    </div>

                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100">

                  <button
                    onClick={() =>
                      setSelectedCow(cow)
                    }
                    className="flex-1 bg-[#1E5631] text-white py-2 px-3 rounded-xl font-medium text-sm hover:bg-[#164225] transition cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      setEditingCow({
                        ...cow,
                        age: cow.age || "",
                        weight: cow.weight || "",
                        height: cow.height || "",
                        price: cow.price || "",
                      });

                      setNewCoverImage(null);
                      setNewVideo(null);
                    }}
                    className="bg-amber-500 text-white p-2 rounded-xl font-medium text-sm hover:bg-amber-600 transition cursor-pointer"
                    title="Edit"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(cow._id)
                    }
                    className="bg-red-500 text-white p-2 rounded-xl font-medium text-sm hover:bg-red-600 transition cursor-pointer"
                    title="Delete"
                  >
                    🗑️
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* ==========================================
          VIEW DETAILS MODAL
      ========================================== */}
      {selectedCow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">

          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">

            <div className="flex justify-between items-center mb-4 border-b pb-3">

              <h2 className="text-2xl font-bold text-[#1E5631]">
                {selectedCow.name} Details
              </h2>

              <button
                onClick={() =>
                  setSelectedCow(null)
                }
                className="text-gray-500 hover:text-black font-bold text-xl cursor-pointer"
              >
                ✕
              </button>

            </div>

            <div className="space-y-6">

              {/* COVER */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Cover Image
                </h3>

                <img
                  src={
                    selectedCow.coverImage
                      ? getMediaUrl(
                          selectedCow.coverImage
                        )
                      : "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-xl border"
                />
              </div>

              {/* VIDEO */}
              {selectedCow.video && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Cow Video
                  </h3>

                  <video
                    controls
                    className="w-full h-64 object-cover rounded-xl border"
                  >
                    <source
                      src={getMediaUrl(
                        selectedCow.video
                      )}
                    />

                    Your browser does not support video.
                  </video>
                </div>
              )}

              {/* DETAILS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#F8F5EE] p-4 rounded-xl text-sm">

                <div>
                  <strong>Tag Number:</strong>{" "}
                  {selectedCow.tagNumber}
                </div>

                <div>
                  <strong>Breed:</strong>{" "}
                  {selectedCow.breed}
                </div>

                <div>
                  <strong>Gender:</strong>{" "}
                  {selectedCow.gender}
                </div>

                <div>
                  <strong>Age:</strong>{" "}
                  {selectedCow.age} Years
                </div>

                <div>
                  <strong>Weight:</strong>{" "}
                  {selectedCow.weight} KG
                </div>

                <div>
                  <strong>Height:</strong>{" "}
                  {selectedCow.height} CM
                </div>

                <div>
                  <strong>Color:</strong>{" "}
                  {selectedCow.color}
                </div>

                <div>
                  <strong>Price:</strong>{" "}
                  PKR {selectedCow.price}
                </div>

                <div>
                  <strong>Vaccinated:</strong>{" "}
                  {selectedCow.vaccinated
                    ? "Yes"
                    : "No"}
                </div>

                <div>
                  <strong>Health:</strong>{" "}
                  {selectedCow.healthStatus}
                </div>

                <div>
                  <strong>Feed Type:</strong>{" "}
                  {selectedCow.feedType}
                </div>

                <div>
                  <strong>Status:</strong>{" "}
                  {selectedCow.status}
                </div>

              </div>

              {/* DESCRIPTION */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Full Description
                </h3>

                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border">
                  {selectedCow.description ||
                    "No full description available."}
                </p>
              </div>

            </div>

            <div className="mt-6 flex justify-end">

              <button
                onClick={() =>
                  setSelectedCow(null)
                }
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          EDIT MODAL
      ========================================== */}
      {editingCow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">

          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">

            <div className="flex justify-between items-center mb-4 border-b pb-3">

              <h2 className="text-2xl font-bold text-[#1E5631]">
                Edit Complete Cow Info & Media
              </h2>

              <button
                onClick={() =>
                  setEditingCow(null)
                }
                className="text-gray-500 hover:text-black font-bold text-xl cursor-pointer"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleUpdateSubmit}
              className="space-y-4"
            >

              {/* NAME + TAG */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Name
                  </label>

                  <input
                    type="text"
                    value={editingCow.name || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        name: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Tag Number
                  </label>

                  <input
                    type="text"
                    value={editingCow.tagNumber || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        tagNumber: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

              </div>

              {/* BREED GENDER PRICE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Breed
                  </label>

                  <input
                    type="text"
                    value={editingCow.breed || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        breed: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Gender
                  </label>

                  <select
                    value={
                      editingCow.gender || "Male"
                    }
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        gender: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Price (PKR)
                  </label>

                  <input
                    type="number"
                    value={editingCow.price || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        price: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

              </div>

              {/* AGE WEIGHT HEIGHT */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Age (Years)
                  </label>

                  <input
                    type="number"
                    value={editingCow.age || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        age: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Weight (KG)
                  </label>

                  <input
                    type="number"
                    value={editingCow.weight || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        weight: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Height (CM)
                  </label>

                  <input
                    type="number"
                    value={editingCow.height || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        height: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2"
                  />
                </div>

              </div>

              {/* COLOR HEALTH FEED */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Color
                  </label>

                  <input
                    type="text"
                    value={editingCow.color || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        color: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Health Status
                  </label>

                  <input
                    type="text"
                    value={
                      editingCow.healthStatus || ""
                    }
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        healthStatus: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Feed Type
                  </label>

                  <input
                    type="text"
                    value={editingCow.feedType || ""}
                    onChange={(e) =>
                      setEditingCow({
                        ...editingCow,
                        feedType: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2"
                  />
                </div>

              </div>

              {/* MEDIA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border">

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Update Cover Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewCoverImage(
                        e.target.files[0]
                      )
                    }
                    className="w-full text-sm text-gray-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    Update Video
                  </label>

                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setNewVideo(
                        e.target.files[0]
                      )
                    }
                    className="w-full text-sm text-gray-500"
                  />
                </div>

              </div>

              {/* STATUS */}
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Sale Status
                </label>

                <select
                  value={
                    editingCow.status ||
                    "Available"
                  }
                  onChange={(e) =>
                    setEditingCow({
                      ...editingCow,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-2"
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Sold">
                    Sold
                  </option>
                </select>
              </div>

              {/* SHORT DESCRIPTION */}
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Short Description
                </label>

                <textarea
                  rows="2"
                  value={
                    editingCow.shortDescription ||
                    ""
                  }
                  onChange={(e) =>
                    setEditingCow({
                      ...editingCow,
                      shortDescription:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-2 resize-none"
                />
              </div>

              {/* FULL DESCRIPTION */}
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Full Description
                </label>

                <textarea
                  rows="4"
                  value={
                    editingCow.description || ""
                  }
                  onChange={(e) =>
                    setEditingCow({
                      ...editingCow,
                      description:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-2 resize-none"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t">

                <button
                  type="button"
                  onClick={() =>
                    setEditingCow(null)
                  }
                  className="bg-gray-300 text-gray-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-400 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#1E5631] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#164225] transition cursor-pointer"
                >
                  Save Changes
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}