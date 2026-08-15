import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // SUBMIT FORM
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "https://vercel-backend-production-d74f.up.railway.app/api/contacts",
        formData
      );

      setSuccess(
        response.data?.message ||
          "Your message has been sent successfully!"
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err.response?.data?.message ||
          "Message could not be sent. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8F5E9]">
      {/* ==================================================
          NAVBAR
      ================================================== */}
      <Navbar />

      {/* ==================================================
          HERO SECTION
      ================================================== */}
      <section className="w-full bg-[#225D31]">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="flex min-h-[300px] items-center py-14 sm:min-h-[330px] sm:py-16 md:min-h-[360px] md:py-20">
            <div className="w-full max-w-[720px]">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2.5px] text-[#E2A83B] sm:text-[11px]">
                GET IN TOUCH
              </p>

              <h1 className="font-serif text-[38px] font-bold leading-[1.08] tracking-[-0.5px] text-[#FFFDF5] sm:text-[46px] md:text-[54px]">
                Contact Our Farm
              </h1>

              <p className="mt-5 max-w-[650px] text-[12px] leading-[1.8] text-[#DCE7DE] sm:text-[13px] md:text-[14px]">
                Questions about a specific animal, pricing or delivery?
                Message us on WhatsApp for the quickest reply, or send the
                form and we'll come back to you the same day.
              </p>

              <div className="mt-7 h-[2px] w-[55px] rounded-full bg-[#E2A83B]" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTACT MAIN SECTION
      ================================================== */}
      <section className="w-full bg-[#F8F5E9] py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          
          {/* ==================================================
              LEFT SIDE
          ================================================== */}
          <div className="min-w-0">
            <h2 className="mb-8 font-serif text-[23px] font-bold text-[#354238] sm:text-[25px]">
              Farm details
            </h2>

            {/* ADDRESS */}
            <div className="mb-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F0E5]">
                <FaMapMarkerAlt className="text-[14px] text-[#397044]" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-medium uppercase tracking-[1px] text-[#999587]">
                  FARM ADDRESS
                </p>

                <p className="mt-1 text-[12px] leading-5 text-[#354238] sm:text-[13px]">
                  Meadowline Road 42, Greenvale County, TX 75001
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="mb-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F0E5]">
                <FaPhoneAlt className="text-[13px] text-[#397044]" />
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[1px] text-[#999587]">
                  PHONE
                </p>

                <p className="mt-1 text-[12px] text-[#354238] sm:text-[13px]">
                  +92 300 1234567
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-8 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F0E5]">
                <FaEnvelope className="text-[13px] text-[#397044]" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-medium uppercase tracking-[1px] text-[#999587]">
                  EMAIL
                </p>

                <p className="mt-1 break-all text-[12px] text-[#354238] sm:text-[13px]">
                  siddiqui.hadi0104@gmail.com
                </p>
              </div>
            </div>

            {/* BUSINESS HOURS */}
            <div className="rounded-[18px] border border-[#DDD8C9] bg-white p-5 shadow-[0_12px_30px_rgba(60,50,30,0.06)] sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <FaClock className="text-[12px] text-[#E2A83B]" />

                <h3 className="text-[12px] font-bold text-[#354238]">
                  Business Hours
                </h3>
              </div>

              {/* Monday - Friday */}
              <div className="flex flex-col gap-1 border-b border-[#E5E0D5] py-3 text-[11px] text-[#59645B] sm:flex-row sm:items-center sm:justify-between">
                <span>Monday – Friday</span>
                <span>7:00 AM – 7:00 PM</span>
              </div>

              {/* Saturday */}
              <div className="flex flex-col gap-1 border-b border-[#E5E0D5] py-3 text-[11px] text-[#59645B] sm:flex-row sm:items-center sm:justify-between">
                <span>Saturday</span>
                <span>8:00 AM – 5:00 PM</span>
              </div>

              {/* Sunday */}
              <div className="flex flex-col gap-1 py-3 text-[11px] text-[#59645B] sm:flex-row sm:items-center sm:justify-between">
                <span>Sunday</span>
                <span>By appointment only</span>
              </div>
            </div>

            {/* QUICK BUTTONS */}
            <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
              
              {/* WhatsApp */}
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[44px] items-center justify-center gap-2 rounded-full bg-[#20C66B] px-6 text-[11px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#18B961]"
              >
                <FaWhatsapp className="text-[15px]" />
                Chat on WhatsApp
              </a>

              {/* Browse Cows */}
              <a
                href="/cows"
                className="flex h-[44px] items-center justify-center rounded-full border border-[#D8D2C2] bg-white px-6 text-[11px] font-semibold text-[#354238] transition-all duration-300 hover:-translate-y-1 hover:bg-[#225D31] hover:text-white"
              >
                Browse Cows
              </a>
            </div>
          </div>

          {/* ==================================================
              RIGHT SIDE - CONTACT FORM
          ================================================== */}
          <div className="min-w-0">
            <div className="rounded-[18px] border border-[#DDD8C9] bg-white p-5 shadow-[0_12px_30px_rgba(60,50,30,0.07)] sm:p-7 md:p-8">
              
              <h2 className="font-serif text-[21px] font-bold text-[#354238] sm:text-[23px]">
                Send us a message
              </h2>

              <p className="mt-2 text-[10px] leading-5 text-[#999587] sm:text-[11px]">
                Fill in your details and our livestock team will reply shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                
                {/* NAME + PHONE */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[10px] font-medium text-[#59645B]"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="h-[44px] w-full rounded-[10px] border border-[#DDD8C9] bg-[#FCFBF7] px-4 text-[12px] text-[#354238] outline-none transition-all duration-200 placeholder:text-[#AAA69B] focus:border-[#397044] focus:ring-2 focus:ring-[#397044]/10"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-[10px] font-medium text-[#59645B]"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your phone"
                      className="h-[44px] w-full rounded-[10px] border border-[#DDD8C9] bg-[#FCFBF7] px-4 text-[12px] text-[#354238] outline-none transition-all duration-200 placeholder:text-[#AAA69B] focus:border-[#397044] focus:ring-2 focus:ring-[#397044]/10"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-medium text-[#59645B]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="h-[44px] w-full rounded-[10px] border border-[#DDD8C9] bg-[#FCFBF7] px-4 text-[12px] text-[#354238] outline-none transition-all duration-200 placeholder:text-[#AAA69B] focus:border-[#397044] focus:ring-2 focus:ring-[#397044]/10"
                  />
                </div>

                {/* MESSAGE */}
                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[10px] font-medium text-[#59645B]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your message..."
                    className="min-h-[125px] w-full resize-none rounded-[10px] border border-[#DDD8C9] bg-[#FCFBF7] px-4 py-3 text-[12px] leading-5 text-[#354238] outline-none transition-all duration-200 placeholder:text-[#AAA69B] focus:border-[#397044] focus:ring-2 focus:ring-[#397044]/10"
                  />
                </div>

                {/* SUCCESS MESSAGE */}
                {success && (
                  <div className="mt-4 rounded-[10px] border border-[#CDE5D1] bg-[#EAF6EC] px-4 py-3 text-[11px] font-medium leading-5 text-[#225D31]">
                    {success}
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                  <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[11px] font-medium leading-5 text-red-600">
                    {error}
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex h-[44px] w-full items-center justify-center rounded-full bg-[#225D31] text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#184A25] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}
      <Footer />
    </div>
  );
};

export default Contact;