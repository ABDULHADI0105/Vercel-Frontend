import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CowDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cow, setCow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchCowDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cows/${id}`);
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON. Please check backend route and ID.");
        }

        const data = await response.json();
        if (response.ok) {
          setCow(data);
          // Set initial cover image for the preview switcher
          setActiveImage(data.coverImage || "");
        } else {
          alert(data.message || "Cow not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching cow details:", error);
        alert("Failed to load cow details. Please check if the cow exists.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCowDetails();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const getMediaUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http")) return filePath;
    let cleanPath = filePath.replace(/\\/g, "/");
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);
    return `http://localhost:5000/${cleanPath.startsWith("uploads/") ? cleanPath : `uploads/${cleanPath}`}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B3B2E]"></div>
      </div>
    );
  }

  if (!cow) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[#0B3B2E] font-semibold hover:text-[#236B36] transition cursor-pointer"
        >
          ← Back to Collection
        </button>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Left Column: Media (Cover Image, Gallery & Video) */}
            <div className="space-y-6">
              {/* Active / Cover Image */}
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                <img
                  src={activeImage ? getMediaUrl(activeImage) : "https://via.placeholder.com/600x400?text=No+Image"}
                  alt={cow.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B3B2E] text-xs font-bold px-3 py-1 rounded-full shadow">
                  Tag: {cow.tagNumber}
                </span>
                <span className="absolute top-4 right-4 bg-[#E6B84A] text-[#0B3B2E] px-4 py-1.5 rounded-full text-sm font-bold shadow">
                  PKR {cow.price}
                </span>
              </div>

              {/* Gallery Images Thumbnails */}
              {cow.galleryImages && cow.galleryImages.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-serif text-sm text-[#0B3B2E] font-semibold">Gallery Photos</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {/* Include cover image in gallery switcher too if desired */}
                    {cow.coverImage && (
                      <div 
                        onClick={() => setActiveImage(cow.coverImage)}
                        className={`w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-2 flex-shrink-0 transition ${activeImage === cow.coverImage ? 'border-[#236B36] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img src={getMediaUrl(cow.coverImage)} alt="Cover thumbnail" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {cow.galleryImages.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-2 flex-shrink-0 transition ${activeImage === img ? 'border-[#236B36] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img
                          src={getMediaUrl(img)}
                          alt={`Gallery ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Player Section */}
              {cow.video && (
                <div className="space-y-2">
                  <h3 className="font-serif text-lg text-[#0B3B2E]">Live Video Preview</h3>
                  <div className="rounded-2xl overflow-hidden bg-black shadow-md border">
                    <video controls className="w-full h-56 object-cover">
                      <source src={getMediaUrl(cow.video)} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Complete Info & Specs */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[#A36A1F] text-xs tracking-[3px] font-semibold uppercase">
                    {cow.breed}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${cow.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {cow.status || "Available"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif text-[#0B3B2E] mb-3">
                  {cow.name || "Unnamed Cattle"}
                </h1>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {cow.description || cow.shortDescription || "No detailed description provided for this cattle."}
                </p>

                {/* Complete Specifications Grid (100% Comprehensive) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#FAF9F5] p-4 rounded-2xl border border-gray-100 mb-6 text-sm">
                  <div>
                    <span className="text-gray-400 text-xs block">Gender</span>
                    <strong className="text-[#0B3B2E]">{cow.gender || "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Age</span>
                    <strong className="text-[#0B3B2E]">{cow.age ? `${cow.age} Years` : "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Weight</span>
                    <strong className="text-[#0B3B2E]">{cow.weight ? `${cow.weight} KG` : "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Height</span>
                    <strong className="text-[#0B3B2E]">{cow.height ? `${cow.height} Inches` : "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Teeth</span>
                    <strong className="text-[#0B3B2E]">{cow.teeth ? `${cow.teeth} Teeth` : "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Color</span>
                    <strong className="text-[#0B3B2E]">{cow.color || "N/A"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Vaccinated</span>
                    <strong className="text-[#0B3B2E]">{cow.vaccinated ? "Yes" : "No"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Location / Farm</span>
                    <strong className="text-[#0B3B2E]">{cow.location || cow.farmLocation || "Main Farm"}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block">Category</span>
                    <strong className="text-[#0B3B2E]">{cow.category || "Qurbani"}</strong>
                  </div>
                </div>

                {/* Health & Feed Extra Details */}
                <div className="space-y-2 mb-6 text-sm bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Health Status:</span>
                    <span className="text-[#0B3B2E] font-semibold">{cow.healthStatus || "Healthy & Active"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Feed Type:</span>
                    <span className="text-[#0B3B2E] font-semibold">{cow.feedType || "Natural Organic Feed & Green Fodder"}</span>
                  </div>
                  {cow.sellerContact && (
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-500 font-medium">Contact / Seller:</span>
                      <span className="text-[#0B3B2E] font-semibold">{cow.sellerContact}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => alert("Booking / Inquiry feature coming soon!")}
                className="w-full bg-[#236B36] text-white py-3.5 rounded-full text-base font-semibold hover:bg-[#0B3B2E] transition shadow-lg cursor-pointer"
              >
                Inquire / Book This Cow
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}