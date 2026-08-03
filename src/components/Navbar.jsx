import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaWhatsapp,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import {
  HiOutlineBars3BottomRight,
  HiOutlineXMark,
} from "react-icons/hi2";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const scroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  const menus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Cows",
      path: "/cows",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        sticky
          ? "bg-white shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5">

        <div className="h-[90px] flex items-center justify-between">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-[#255F38] flex items-center justify-center text-white text-xl font-bold">
              S
            </div>

            <div>

              <h2
                className={`text-xl font-bold leading-none transition ${
                  sticky
                    ? "text-[#255F38]"
                    : "text-white"
                }`}
              >
                ShahanCattle Farm
              </h2>

              <p
                className={`uppercase tracking-[4px] text-[10px] transition ${
                  sticky
                    ? "text-gray-500"
                    : "text-white/80"
                }`}
              >
                Livestock
              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-10">

            {menus.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative font-medium transition-all duration-300 ${
                    sticky
                      ? "text-gray-800"
                      : "text-white"
                  } ${
                    isActive
                      ? "after:w-full text-[#255F38]"
                      : "after:w-0 hover:after:w-full"
                  }
                  
                  after:absolute
                  after:left-0
                  after:-bottom-2
                  after:h-[2px]
                  after:bg-[#255F38]
                  after:transition-all
                  after:duration-300`
                }
              >
                {item.name}
              </NavLink>
            ))}

          </nav>

          {/* Right Side */}

          <div className="hidden lg:flex items-center gap-4">

            {/* Login */}

            <NavLink
              to="/login"
              className={`flex items-center gap-2 font-medium transition ${
                sticky
                  ? "text-gray-700 hover:text-[#255F38]"
                  : "text-white hover:text-green-300"
              }`}
            >
              <FaUser size={14} />
              Login
            </NavLink>

            {/* Register */}

            <NavLink
              to="/register"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                sticky
                  ? "border-[#255F38] text-[#255F38] hover:bg-[#255F38] hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-[#255F38]"
              }`}
            >
              <FaUserPlus size={14} />
              Register
            </NavLink>

            {/* WhatsApp */}

            <a
              href="https://wa.me/3073841913"
              target="_blank"
              rel="noreferrer"
              className="bg-[#27AE60] hover:bg-[#219653] transition px-6 py-3 rounded-full text-white flex items-center gap-2 font-medium shadow-md"
            >
              <FaWhatsapp />

              WhatsApp

            </a>

          </div>

          {/* Mobile */}

          <button
            className={`lg:hidden text-3xl ${
              sticky
                ? "text-black"
                : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <HiOutlineXMark />
            ) : (
              <HiOutlineBars3BottomRight />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden bg-white overflow-hidden transition-all duration-500 ${
          menuOpen
            ? "max-h-[500px]"
            : "max-h-0"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 py-6 flex flex-col gap-6">

          {menus.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              {item.name}
            </NavLink>
          ))}

          <NavLink
            to="/login"
            className="font-medium"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="font-medium"
          >
            Register
          </NavLink>

       <a
          href="https://wa.me/3073841913"
          target="_blank"
          rel="noopener noreferrer"
          className="
          mt-7
          inline-flex
          items-center
          gap-3
          bg-[#28c76f]
          px-6
          py-3
          rounded-full
          font-semibold
          text-sm
          hover:scale-105
          transition
          ">


        <FaWhatsapp />
            WhatsApp
          </a>

        </div>
      </div>
    </header>
  );
};

export default Navbar;