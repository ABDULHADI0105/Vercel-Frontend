import { useState } from "react";
import API from "../../api/axios";

export default function AddCow() {
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    // Basic Information
    name: "",
    tagNumber: "",
    breed: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    color: "",
    price: "",

    // Health
    vaccinated: true,
    healthStatus: "Healthy",
    feedType: "",
    status: "Available",
    featured: false,

    // Description
    shortDescription: "",
    description: "",

    // Media
    coverImage: null,
    galleryImages: [],
    video: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Preview States
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState("");

  // ==================================================
  // HANDLE CHANGE
  // ==================================================
  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      if (name === "coverImage") {
        if (!files || !files[0]) return;

        setFormData((prev) => ({
          ...prev,
          coverImage: files[0],
        }));

        setCoverPreview(URL.createObjectURL(files[0]));
      }

      else if (name === "galleryImages") {
        const gallery = [...files];

        setFormData((prev) => ({
          ...prev,
          galleryImages: gallery,
        }));

        setGalleryPreview(
          gallery.map((file) => URL.createObjectURL(file))
        );
      }

      else if (name === "video") {
        if (!files || !files[0]) return;

        setFormData((prev) => ({
          ...prev,
          video: files[0],
        }));

        setVideoPreview(URL.createObjectURL(files[0]));
      }
    }

    else if (type === "checkbox") {
      const { checked } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }

    else if (name === "vaccinated") {
      setFormData((prev) => ({
        ...prev,
        vaccinated: value === "true",
      }));
    }

    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ==================================================
  // HANDLE SUBMIT
  // ==================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const dataToSend = new FormData();

      // ==================================================
      // APPEND TEXT / NUMBER / BOOLEAN FIELDS
      // ==================================================
      for (const key in formData) {
        if (key === "galleryImages") {
          formData.galleryImages.forEach((file) => {
            dataToSend.append("galleryImages", file);
          });
        }

        else if (
          key !== "coverImage" &&
          key !== "video"
        ) {
          dataToSend.append(key, formData[key]);
        }
      }

      // ==================================================
      // COVER IMAGE
      // ==================================================
      if (formData.coverImage) {
        dataToSend.append(
          "coverImage",
          formData.coverImage
        );
      }

      // ==================================================
      // VIDEO
      // ==================================================
      if (formData.video) {
        dataToSend.append(
          "video",
          formData.video
        );
      }

      // ==================================================
      // RAILWAY BACKEND API
      // ==================================================
      const response = await API.post(
        "/cows/add",
        dataToSend
      );

      console.log("Cow API Response:", response.data);

      alert(
        response.data?.message ||
          "Cow added successfully to MongoDB!"
      );

      // ==================================================
      // RESET FORM
      // ==================================================
      setFormData(initialFormState);

      setCoverPreview("");
      setGalleryPreview([]);
      setVideoPreview("");

      e.target.reset();

    } catch (error) {
      console.error(
        "Error submitting cow:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Server error! Cow could not be added."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-6">

      <form onSubmit={handleSubmit}>

        {/* ==================================================
            PAGE HEADER
        ================================================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E5631]">
            Add New Cow
          </h1>

          <p className="text-gray-500 mt-2">
            Fill in the information below to add a new cow to MongoDB.
          </p>
        </div>

        {/* ==================================================
            BASIC INFORMATION
        ================================================== */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-xl font-semibold text-[#1E5631] mb-6 border-b pb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Cow Name */}
            <div>
              <label className="block mb-2 font-medium">
                Cow Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter Cow Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Tag Number */}
            <div>
              <label className="block mb-2 font-medium">
                Tag Number
              </label>

              <input
                type="text"
                name="tagNumber"
                placeholder="SH-001"
                value={formData.tagNumber}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Breed */}
            <div>
              <label className="block mb-2 font-medium">
                Breed
              </label>

              <input
                type="text"
                name="breed"
                placeholder="Sahiwal"
                value={formData.breed}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 font-medium">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block mb-2 font-medium">
                Age (Years)
              </label>

              <input
                type="number"
                name="age"
                placeholder="4"
                value={formData.age}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block mb-2 font-medium">
                Weight (KG)
              </label>

              <input
                type="number"
                name="weight"
                placeholder="650"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block mb-2 font-medium">
                Height (CM)
              </label>

              <input
                type="number"
                name="height"
                placeholder="145"
                value={formData.height}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block mb-2 font-medium">
                Color
              </label>

              <input
                type="text"
                name="color"
                placeholder="Brown & White"
                value={formData.color}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Price */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Price (PKR)
              </label>

              <input
                type="number"
                name="price"
                placeholder="250000"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

          </div>
        </div>

        {/* ==================================================
            HEALTH & SALE INFORMATION
        ================================================== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-xl font-semibold text-[#1E5631] mb-6 border-b pb-4">
            Health & Sale Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vaccinated */}
            <div>
              <label className="block mb-2 font-medium">
                Vaccinated
              </label>

              <select
                name="vaccinated"
                value={String(formData.vaccinated)}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="true">
                  Yes
                </option>

                <option value="false">
                  No
                </option>
              </select>
            </div>

            {/* Health Status */}
            <div>
              <label className="block mb-2 font-medium">
                Health Status
              </label>

              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="Healthy">
                  Healthy
                </option>

                <option value="Under Treatment">
                  Under Treatment
                </option>
              </select>
            </div>

            {/* Feed */}
            <div>
              <label className="block mb-2 font-medium">
                Feed Type
              </label>

              <input
                type="text"
                name="feedType"
                placeholder="Grass, Silage, Grain..."
                value={formData.feedType}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 font-medium">
                Sale Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="Available">
                  Available
                </option>

                <option value="Sold">
                  Sold
                </option>
              </select>
            </div>

            {/* Featured */}
            <div className="md:col-span-2 flex items-center gap-3">

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <label className="font-medium">
                Show this cow in Featured Section
              </label>

            </div>

          </div>
        </div>

        {/* ==================================================
            DESCRIPTION
        ================================================== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-xl font-semibold text-[#1E5631] mb-6 border-b pb-4">
            Cow Description
          </h2>

          <div className="space-y-6">

            {/* Short */}
            <div>
              <label className="block mb-2 font-medium">
                Short Description
              </label>

              <textarea
                rows="3"
                name="shortDescription"
                placeholder="Write a short description..."
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Full */}
            <div>
              <label className="block mb-2 font-medium">
                Full Description
              </label>

              <textarea
                rows="8"
                name="description"
                placeholder="Write complete details about this cow..."
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

          </div>
        </div>

        {/* ==================================================
            UPLOAD MEDIA
        ================================================== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-xl font-semibold text-[#1E5631] mb-6 border-b pb-4">
            Upload Media
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cover Image */}
            <div>

              <label className="block mb-3 font-semibold">
                Cover Image
              </label>

              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
              />

              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="mt-4 w-full h-56 object-cover rounded-xl border"
                />
              )}

            </div>

            {/* Gallery */}
            <div>

              <label className="block mb-3 font-semibold">
                Gallery Images
              </label>

              <input
                type="file"
                multiple
                name="galleryImages"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
              />

              <div className="grid grid-cols-3 gap-2 mt-4">

                {galleryPreview.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                ))}

              </div>

            </div>

            {/* Video */}
            <div>

              <label className="block mb-3 font-semibold">
                Cow Video
              </label>

              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
              />

              {videoPreview && (
                <video
                  controls
                  className="mt-4 rounded-xl w-full h-56 object-cover"
                >
                  <source
                    src={videoPreview}
                    type="video/mp4"
                  />

                  Your browser does not support the video tag.
                </video>
              )}

            </div>

          </div>
        </div>

        {/* ==================================================
            SUBMIT BUTTON
        ================================================== */}
        <div className="mt-8 flex justify-end">

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1E5631] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-[#164225] transition duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >

            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>

                Saving Cow...
              </>
            ) : (
              "Save Cow"
            )}

          </button>

        </div>

      </form>
    </div>
  );
}