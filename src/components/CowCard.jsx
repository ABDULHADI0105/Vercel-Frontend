import { Link } from "react-router-dom";

export default function CowCard({ cow }) {
  // ==================================================
  // MEDIA URL HELPER
  // ==================================================
  const getMediaUrl = (filePath) => {
    if (!filePath) {
      return "https://via.placeholder.com/300";
    }

    // Agar already complete URL hai
    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://")
    ) {
      return filePath;
    }

    let cleanPath = filePath.replace(/\\/g, "/");

    // Starting slash remove
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.slice(1);
    }

    const backendUrl =
      "https://vercel-backend-production-d74f.up.railway.app";

    // Agar uploads already included hai
    if (cleanPath.startsWith("uploads/")) {
      return `${backendUrl}/${cleanPath}`;
    }

    return `${backendUrl}/uploads/${cleanPath}`;
  };

  return (
    <Link
      to={`/cow-details/${cow._id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* ==================================================
          IMAGE SECTION
      ================================================== */}
      <div className="relative h-60 overflow-hidden">

        <img
          src={getMediaUrl(cow.coverImage)}
          alt={cow.name || "Cow"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tag */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-[#0B3B2E]">
          Tag: {cow.tagNumber || "N/A"}
        </div>

        {/* Status */}
        {cow.status && (
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold ${
              cow.status === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {cow.status}
          </div>
        )}
      </div>

      {/* ==================================================
          INFO SECTION
      ================================================== */}
      <div className="p-4">

        {/* Name + Price */}
        <div className="flex justify-between items-start mb-2 gap-3">

          <h3 className="text-lg font-bold text-[#0B3B2E]">
            {cow.name || "Unnamed Cow"}
          </h3>

          <span className="text-[#A36A1F] font-bold text-sm whitespace-nowrap">
            PKR {cow.price || "N/A"}
          </span>

        </div>

        {/* Weight + Age */}
        <div className="flex gap-4 text-xs text-gray-500 mb-4">

          <span>
            {cow.weight ? `${cow.weight} KG` : "N/A"}
          </span>

          <span>•</span>

          <span>
            {cow.age ? `${cow.age} Years` : "N/A"}
          </span>

        </div>

        {/* View Details */}
        <button
          type="button"
          className="w-full py-2 bg-[#FAF9F5] group-hover:bg-[#236B36] group-hover:text-white text-[#0B3B2E] font-semibold rounded-lg transition-colors duration-300"
        >
          View Details
        </button>

      </div>
    </Link>
  );
}