    import { Link } from "react-router-dom";

export default function CowCard({ cow }) {
  // Media URL helper
  const getMediaUrl = (filePath) => {
    if (!filePath) return "https://via.placeholder.com/300";
    if (filePath.startsWith("http")) return filePath;
    return `http://localhost:5000/${filePath.replace(/\\/g, "/").replace(/^uploads\//, "")}`;
  };

  return (
    <Link 
      to={`/cow-details/${cow._id}`} 
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={getMediaUrl(cow.coverImage)}
          alt={cow.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-[#0B3B2E]">
          Tag: {cow.tagNumber}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-[#0B3B2E]">{cow.name}</h3>
          <span className="text-[#A36A1F] font-bold text-sm">PKR {cow.price}</span>
        </div>
        
        <div className="flex gap-4 text-xs text-gray-500 mb-4">
          <span>{cow.weight} KG</span>
          <span>•</span>
          <span>{cow.age} Years</span>
        </div>

        <button className="w-full py-2 bg-[#FAF9F5] group-hover:bg-[#236B36] group-hover:text-white text-[#0B3B2E] font-semibold rounded-lg transition-colors duration-300">
          View Details
        </button>
      </div>
    </Link>
  );
}