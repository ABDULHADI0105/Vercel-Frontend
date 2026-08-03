import Navbar from "../components/Navbar";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import aboutImg from "../assets/images/about-farm.jpg";// import { FaCheckCircle } from "react-icons/fa";
import heroVideo from "../assets/videos/hero.mp4";
import FeaturedCows from "../components/FeaturedCows";

const Home = () => {
  return (
    <>
      <Navbar />
{/* ====================== HERO SECTION START ====================== */}

<section className="relative min-h-screen overflow-hidden">

  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/55"></div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-[1280px] mx-auto px-5">

    <div className="min-h-screen flex items-center">

      <div className="max-w-[650px] pt-24">

        <span className="uppercase tracking-[5px] text-[#D4A84F] text-xs sm:text-sm font-semibold">
          Healthy, Hand-Raised Livestock Since 2020
        </span>

        <h1 className="mt-5 text-white font-bold leading-tight
        text-4xl
        sm:text-5xl
        lg:text-6xl
        xl:text-[68px]">

         Welcome To Shahan Cattle Farm
         Where Quality Meets Care

        </h1>

        <p className="mt-8 text-gray-200 leading-8
        text-base
        sm:text-lg">

          Discover premium livestock raised with love, care, and expertise. Shahan Cattle Farm offers healthy dairy cows, breeding bulls, buffalo, and trusted farm animals. Every animal is carefully nurtured, vaccinated, and maintained with the highest standards so you can invest with confidence.

        </p>

        {/* Buttons */}

        <div className="flex flex-wrap gap-4 mt-10">

          <button className="bg-[#D7A94C] hover:bg-[#c89a3d] duration-300 px-8 py-4 rounded-full font-semibold">

            View All Cows

          </button>

          <button className="border border-white text-white hover:bg-white hover:text-black duration-300 px-8 py-4 rounded-full">

            Contact Us

          </button>

          <button className="bg-[#27AE60] hover:bg-[#219150] duration-300 text-white px-8 py-4 rounded-full flex items-center gap-2">

            <FaWhatsapp />

            WhatsApp

          </button>

        </div>

      </div>

    </div>

  </div>

</section>

{/* ======================= HERO SECTION END ======================= */}


{/* ====================== ABOUT SECTION START ====================== */}

<section className="bg-[#F8F4EA] py-20 lg:py-28">
  <div className="max-w-[1280px] mx-auto px-5">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* ================= Left Content ================= */}

      <div>

        <span
          className="uppercase tracking-[4px] text-[13px] font-semibold text-[#A66A2B]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          About The Farm
        </span>

        <h2
          className="mt-5 text-[42px] md:text-[52px] leading-[1.15] font-semibold text-[#162316]"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          A family farm built on healthy
          animals and honest dealing
        </h2>

        <p
          className="mt-8 text-[18px] leading-[36px] text-[#67625D]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          We keep a small, carefully managed herd of premium dairy
          cattle raised with care and proper nutrition. Every animal is
          hand-raised, fully vaccinated and regularly checked to ensure
          excellent health before being offered for sale. Buyers are
          always welcome to visit our farm and see our cattle before
          making a decision.
        </p>

        {/* Features */}

        <div className="grid sm:grid-cols-2 gap-5 mt-10">

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-[#255F38] text-xl" />
            <span
              className="text-[#162316] font-medium"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Healthy & Vaccinated
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-[#255F38] text-xl" />
            <span
              className="text-[#162316] font-medium"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Premium Breeds
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-[#255F38] text-xl" />
            <span
              className="text-[#162316] font-medium"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Experienced Farmers
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-[#255F38] text-xl" />
            <span
              className="text-[#162316] font-medium"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Vet Certified
            </span>
          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-8 mt-14">

          <div>

            <h3
              className="text-[50px] font-semibold text-[#255F38]"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              05+
            </h3>

            <p
              className="uppercase text-[13px] tracking-wide text-[#67625D]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Years Farming
            </p>

          </div>

          <div>

            <h3
              className="text-[50px] font-semibold text-[#255F38]"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              200+
            </h3>

            <p
              className="uppercase text-[13px] tracking-wide text-[#67625D]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Animals Sold
            </p>

          </div>

          <div>

            <h3
              className="text-[50px] font-semibold text-[#255F38]"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              100%
            </h3>

            <p
              className="uppercase text-[13px] tracking-wide text-[#67625D]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Vet Certified
            </p>

          </div>

        </div>

      </div>

      {/* ================= Right Image ================= */}

      <div>

        <img
          src={aboutImg}
          alt="Shahan Cattle Farm"
          className="w-full h-[420px] md:h-[560px] object-cover rounded-[30px]"
        />

      </div>

    </div>

  </div>
</section>

{/* ======================= ABOUT SECTION END ======================= */}


{/* ================= FEATURED COWS SECTION START ================= */}

<FeaturedCows />

{/* ================= FEATURED COWS SECTION END ================= */}


    </>
  );
};

export default Home;