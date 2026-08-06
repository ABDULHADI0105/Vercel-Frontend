import { useState, useEffect } from "react";

export default function AllCows() {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [selectedCow, setSelectedCow] = useState(null); // Detail Modal
  const [editingCow, setEditingCow] = useState(null);   // Edit Modal
  
  // File states for update
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [newVideo, setNewVideo] = useState(null);

  // Fetch all cows from backend
  const fetchCows = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cows");
      const data = await response.json();
      if (response.ok) {
        setCows(data);
      } else {
        console.error("Failed to fetch cows");
      }
    } catch (error) {
      console.error("Error fetching cows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCows();
  }, []);

  // Smart Media URL Resolver
  const getMediaUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http")) return filePath;
    
    let cleanPath = filePath.replace(/\\/g, "/");
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.slice(1);
    }

    if (cleanPath.startsWith("uploads/")) {
      return `http://localhost:5000/${cleanPath}`;
    }

    return `http://localhost:5000/uploads/${cleanPath}`;
  };

  // Delete Cow Handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this cow?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/cows/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Cow deleted successfully!");
          setCows(cows.filter((cow) => cow._id !== id));
        } else {
          alert("Failed to delete cow.");
        }
      } catch (error) {
        console.error("Error deleting cow:", error);
      }
    }
  };

  // Update Cow Handler with Text and Files (FormData)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editingCow.name || "");
      formData.append("tagNumber", editingCow.tagNumber || "");
      formData.append("breed", editingCow.breed || "");
      formData.append("gender", editingCow.gender || "Male");
      formData.append("age", Number(editingCow.age) || 0);
      formData.append("weight", Number(editingCow.weight) || 0);
      formData.append("height", Number(editingCow.height) || 0);
      formData.append("color", editingCow.color || "");
      formData.append("price", Number(editingCow.price) || 0);
      formData.append("healthStatus", editingCow.healthStatus || "");
      formData.append("feedType", editingCow.feedType || "");
      formData.append("status", editingCow.status || "Available");
      formData.append("shortDescription", editingCow.shortDescription || "");
      formData.append("description", editingCow.description || "");

      // Append files if selected
      if (newCoverImage) {
        formData.append("coverImage", newCoverImage);
      }
      if (newVideo) {
        formData.append("video", newVideo);
      }

      const response = await fetch(`http://localhost:5000/api/cows/${editingCow._id}`, {
        method: "PUT",
        body: formData, // No Content-Type header needed when using FormData
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cow updated successfully!");
        setEditingCow(null);
        setNewCoverImage(null);
        setNewVideo(null);
        fetchCows(); // Refresh list
      } else {
        alert(data.message || "Failed to update cow.");
      }
    } catch (error) {
      console.error("Error updating cow:", error);
      alert("Something went wrong while updating.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E5631]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-6">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E5631]">All Cows Inventory</h1>
          <p className="text-gray-500 mt-1">Manage, view, edit or delete your listed farm animals.</p>
        </div>
        <span className="bg-[#1E5631] text-white px-4 py-2 rounded-xl font-semibold shadow">
          Total Cows: {cows.length}
        </span>
      </div>

      {/* Cows Grid */}
      {cows.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No cows found in the database. Please add some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cows.map((cow) => (
            <div key={cow._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between border border-gray-100 hover:shadow-xl transition duration-300">
              {/* Cow Cover Image */}
              <div className="relative h-52 bg-gray-200">
                <img
                  src={cow.coverImage ? getMediaUrl(cow.coverImage) : "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={cow.name}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${cow.status === "Available" ? "bg-green-600" : "bg-red-500"}`}>
                  {cow.status}
                </span>
                {cow.featured && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                    Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#1E5631]">{cow.name || "Unnamed Cow"}</h3>
                    <span className="text-sm font-semibold text-gray-500">Tag: {cow.tagNumber}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cow.shortDescription || "No description provided."}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 bg-[#F8F5EE] p-3 rounded-xl mb-4">
                    <div><strong>Breed:</strong> {cow.breed}</div>
                    <div><strong>Age:</strong> {cow.age} Years</div>
                    <div><strong>Weight:</strong> {cow.weight} KG</div>
                    <div><strong>Price:</strong> PKR {cow.price}</div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedCow(cow)}
                    className="flex-1 bg-[#1E5631] text-white py-2 px-3 rounded-xl font-medium text-sm hover:bg-[#164225] transition text-center cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setEditingCow(cow);
                      setNewCoverImage(null);
                      setNewVideo(null);
                    }}
                    className="bg-amber-500 text-white p-2 rounded-xl font-medium text-sm hover:bg-amber-600 transition cursor-pointer"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(cow._id)}
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

      {/* --- VIEW DETAILS MODAL --- */}
      {selectedCow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-2xl font-bold text-[#1E5631]">{selectedCow.name} Details</h2>
              <button
                onClick={() => setSelectedCow(null)}
                className="text-gray-500 hover:text-black font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Cover Image</h3>
                <img
                  src={selectedCow.coverImage ? getMediaUrl(selectedCow.coverImage) : ""}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-xl border"
                />
              </div>

              {selectedCow.video && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Cow Video</h3>
                  <video controls className="w-full h-64 object-cover rounded-xl border">
                    <source src={getMediaUrl(selectedCow.video)} />
                    Your browser does not support video.
                  </video>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#F8F5EE] p-4 rounded-xl text-sm">
                <div><strong>Tag Number:</strong> {selectedCow.tagNumber}</div>
                <div><strong>Breed:</strong> {selectedCow.breed}</div>
                <div><strong>Gender:</strong> {selectedCow.gender}</div>
                <div><strong>Age:</strong> {selectedCow.age} Years</div>
                <div><strong>Weight:</strong> {selectedCow.weight} KG</div>
                <div><strong>Height:</strong> {selectedCow.height} CM</div>
                <div><strong>Color:</strong> {selectedCow.color}</div>
                <div><strong>Price:</strong> PKR {selectedCow.price}</div>
                <div><strong>Vaccinated:</strong> {selectedCow.vaccinated ? "Yes" : "No"}</div>
                <div><strong>Health:</strong> {selectedCow.healthStatus}</div>
                <div><strong>Feed Type:</strong> {selectedCow.feedType}</div>
                <div><strong>Status:</strong> {selectedCow.status}</div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Full Description</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border">
                  {selectedCow.description || "No full description available."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCow(null)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT COMPLETE COW MODAL (WITH MEDIA) --- */}
      {editingCow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-2xl font-bold text-[#1E5631]">Edit Complete Cow Info & Media</h2>
              <button
                onClick={() => setEditingCow(null)}
                className="text-gray-500 hover:text-black font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-sm">Name</label>
                  <input
                    type="text"
                    value={editingCow.name || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, name: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Tag Number</label>
                  <input
                    type="text"
                    value={editingCow.tagNumber || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, tagNumber: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-sm">Breed</label>
                  <input
                    type="text"
                    value={editingCow.breed || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, breed: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Gender</label>
                  <select
                    value={editingCow.gender || "Male"}
                    onChange={(e) => setEditingCow({ ...editingCow, gender: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Price (PKR)</label>
                  <input
                    type="number"
                    value={editingCow.price || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, price: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-sm">Age (Years)</label>
                  <input
                    type="number"
                    value={editingCow.age || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, age: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Weight (KG)</label>
                  <input
                    type="number"
                    value={editingCow.weight || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, weight: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Height (CM)</label>
                  <input
                    type="number"
                    value={editingCow.height || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, height: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-sm">Color</label>
                  <input
                    type="text"
                    value={editingCow.color || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, color: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Health Status</label>
                  <input
                    type="text"
                    value={editingCow.healthStatus || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, healthStatus: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Feed Type</label>
                  <input
                    type="text"
                    value={editingCow.feedType || ""}
                    onChange={(e) => setEditingCow({ ...editingCow, feedType: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              {/* Media Upload Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border">
                <div>
                  <label className="block mb-1 font-medium text-sm">Update Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCoverImage(e.target.files[0])}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#1E5631] file:text-white hover:file:bg-[#164225] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-sm">Update Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewVideo(e.target.files[0])}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#1E5631] file:text-white hover:file:bg-[#164225] cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">Sale Status</label>
                <select
                  value={editingCow.status || "Available"}
                  onChange={(e) => setEditingCow({ ...editingCow, status: e.target.value })}
                  className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">Short Description</label>
                <textarea
                  rows="2"
                  value={editingCow.shortDescription || ""}
                  onChange={(e) => setEditingCow({ ...editingCow, shortDescription: e.target.value })}
                  className="w-full border rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">Full Description</label>
                <textarea
                  rows="3"
                  value={editingCow.description || ""}
                  onChange={(e) => setEditingCow({ ...editingCow, description: e.target.value })}
                  className="w-full border rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingCow(null)}
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