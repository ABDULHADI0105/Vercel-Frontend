import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

import loginBg from "../assets/images/login-bg.jpg";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Register Error:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(11,59,46,0.65),
            rgba(11,59,46,0.65)
          ),
          url(${loginBg})
        `,
      }}
    >
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div
          className="
            bg-white/95
            backdrop-blur-sm
            p-6
            sm:p-8
            md:p-10
            rounded-3xl
            shadow-2xl
            w-full
            max-w-md
            border
            border-gray-100
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl
              font-serif
              text-[#0B3B2E]
              mb-3
              text-center
            "
          >
            Create Account
          </h1>

          <p
            className="
              text-gray-500
              mb-8
              text-center
              text-sm
              sm:text-base
            "
          >
            Join Shahan Cattle Farm
          </p>

          <form
            onSubmit={submit}
            className="space-y-4 sm:space-y-5"
          >
            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="
                w-full
                border
                border-gray-300
                p-3
                sm:p-3.5
                rounded-lg
                outline-none
                text-sm
                sm:text-base
                focus:border-[#0B3B2E]
              "
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="
                w-full
                border
                border-gray-300
                p-3
                sm:p-3.5
                rounded-lg
                outline-none
                text-sm
                sm:text-base
                focus:border-[#0B3B2E]
              "
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength={6}
              className="
                w-full
                border
                border-gray-300
                p-3
                sm:p-3.5
                rounded-lg
                outline-none
                text-sm
                sm:text-base
                focus:border-[#0B3B2E]
              "
            />

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#0B3B2E]
                text-white
                py-3
                rounded-lg
                hover:bg-[#145544]
                transition
                font-semibold
                text-sm
                sm:text-base
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p
            className="
              text-center
              mt-6
              text-sm
              sm:text-base
              text-gray-600
            "
          >
            Already have an account?

            <Link
              to="/login"
              className="
                text-[#0B3B2E]
                font-semibold
                ml-2
                hover:underline
              "
            >
              Login
            </Link>
          </p>

          {/* Social Icons */}
          <div
            className="
              flex
              justify-center
              gap-5
              sm:gap-6
              mt-8
            "
          >
            <a href="#" aria-label="Instagram">
              <FaInstagram
                size={26}
                className="
                  text-pink-600
                  hover:scale-110
                  transition
                "
              />
            </a>

            <a href="#" aria-label="TikTok">
              <FaTiktok
                size={26}
                className="
                  text-black
                  hover:scale-110
                  transition
                "
              />
            </a>

            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp
                size={26}
                className="
                  text-green-600
                  hover:scale-110
                  transition
                "
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}