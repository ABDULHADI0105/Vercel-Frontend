import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedCows() {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cows from backend API
  useEffect(() => {
    const fetchFeaturedCows = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cows");
        const data = await response.json();
        if (response.ok) {
          // Sirf available ya pehli kuch cows dikhane ke liye (aap saari bhi dikha sakte hain)
          setCows(data);
        }
      } catch (error) {
        console.error("Error fetching featured cows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCows();
  }, []);

  // Media URL Resolver helper
  const getMediaUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http")) return filePath;
    let cleanPath = filePath.replace(/\\/g, "/");
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);
    return `http://localhost:5000/${cleanPath.startsWith("uploads/") ? cleanPath : `uploads/${cleanPath}`}`;
  };

  if (loading) {
    return (
      <div className="py-20 text-center bg-[#FAF9F5]">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B3B2E]"></div>
      </div>
    );
  }

  return (
    <section className="bg-[#FAF9F5] py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <p className="text-[#A36A1F] tracking-[4px] uppercase text-xs font-semibold mb-3">
          Our Collection
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0B3B2E]">
          Featured Cows
        </h2>
        <p className="text-gray-500 mt-4 text-sm sm:text-base">
          Explore our carefully selected healthy cattle raised with quality care and natural farming practices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {cows.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">No featured cows available right now.</p>
        ) : (
          cows.map((cow) => (
            <div
              key={cow._id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 group hover:shadow-xl transition duration-500 flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={cow.coverImage ? getMediaUrl(cow.coverImage) : "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={cow.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B3B2E] text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {cow.tagNumber}
                </span>
                <span className="absolute top-4 right-4 bg-[#E6B84A] text-[#0B3B2E] px-4 py-1.5 rounded-full text-xs font-bold shadow">
                  PKR {cow.price}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[#A36A1F] text-xs tracking-[3px] font-semibold mb-3 uppercase">
                    {cow.breed}
                  </p>
                  <h3 className="text-2xl font-serif text-[#0B3B2E] mb-3">
                    {cow.name || "Unnamed Cow"}
                  </h3>
                  <p className="text-gray-500 text-sm leading-6 line-clamp-2">
                    {cow.shortDescription || cow.description || "No description provided."}
                  </p>

                  <hr className="my-5 border-gray-100" />

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>
                      <p className="text-gray-400 text-xs">Age</p>
                      <p className="font-semibold">{cow.age} Years</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Weight</p>
                      <p className="font-semibold">{cow.weight} KG</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/cow-details/${cow._id}`)}
                  className="mt-6 w-full bg-[#236B36] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#0B3B2E] transition cursor-pointer shadow-md"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}