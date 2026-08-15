import Navbar from "../components/Navbar";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import aboutImg from "../assets/images/about-farm.jpg";// import { FaCheckCircle } from "react-icons/fa";
import heroVideo from "../assets/videos/hero.mp4";
import FeaturedCows from "../components/FeaturedCows";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <>
      <Navbar />
{/* ====================== HERO SECTION START ====================== */}

<section className="
relative 
min-h-screen 
overflow-hidden
">


  {/* Background Video */}

  <video
    autoPlay
    muted
    loop
    playsInline
    className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    "
  >

    <source src={heroVideo} type="video/mp4" />

  </video>





  {/* Overlay */}

  <div 
  className="
  absolute
  inset-0
  bg-black/60
  sm:bg-black/55
  "
  ></div>







  {/* Hero Content */}

  <div className="
  relative
  z-10
  max-w-[1280px]
  mx-auto
  px-5
  sm:px-8
  lg:px-10
  ">


    <div className="
    min-h-screen
    flex
    items-center
    ">



      <div className="
      max-w-[720px]
      pt-24
      sm:pt-28
      lg:pt-20
      pb-16
      ">





        {/* Small Heading */}


        <span 
        className="
        uppercase
        tracking-[3px]
        sm:tracking-[5px]
        text-[#D4A84F]
        text-[11px]
        sm:text-xs
        md:text-sm
        font-semibold
        "
        >

          Healthy, Hand-Raised Livestock Since 2020

        </span>








        {/* Main Heading */}


        <h1
        className="
        mt-4
        sm:mt-5
        text-white
        font-bold
        leading-[1.15]
        text-[34px]
        sm:text-5xl
        md:text-6xl
        lg:text-[50px]
        "
        >

          Welcome To Shahan Cattle Farm
          <br className="hidden sm:block"/>

          Where Quality Meets Care


        </h1>







        {/* Description */}


        <p
        className="
        mt-6
        sm:mt-8
        text-gray-200
        leading-7
        sm:leading-8
        text-sm
        sm:text-base
        md:text-lg
        max-w-[650px]
        "
        >

          Discover premium livestock raised with love, care, and expertise.
          Shahan Cattle Farm offers healthy dairy cows, breeding bulls,
          buffalo, and trusted farm animals. Every animal is carefully
          nurtured, vaccinated, and maintained with the highest standards
          so you can invest with confidence.

        </p>









        {/* Buttons */}


        <div className="
        flex
        flex-col
        sm:flex-row
        flex-wrap
        gap-4
        mt-8
        sm:mt-10
        ">



          <button
          className="
          w-full
          sm:w-auto
          bg-[#D7A94C]
          hover:bg-[#c89a3d]
          duration-300
          px-8
          py-4
          rounded-full
          font-semibold
          text-sm
          sm:text-base
          ">

            View All Cows

          </button>







          <button
          className="
          w-full
          sm:w-auto
          border
          border-white
          text-white
          hover:bg-white
          hover:text-black
          duration-300
          px-8
          py-4
          rounded-full
          font-semibold
          text-sm
          sm:text-base
          ">

            Contact Us

          </button>







          <button
          className="
          w-full
          sm:w-auto
          bg-[#27AE60]
          hover:bg-[#219150]
          duration-300
          text-white
          px-8
          py-4
          rounded-full
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          text-sm
          sm:text-base
          ">


            <FaWhatsapp size={20}/>

            WhatsApp


          </button>



        </div>





      </div>


    </div>


  </div>


</section>


{/* ======================= HERO SECTION END ======================= */}


{/* ====================== ABOUT SECTION START ====================== */}

<section className="bg-[#F8F4EA] py-14 sm:py-20 lg:py-28">

  <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">


    <div className="
    grid 
    grid-cols-1 
    lg:grid-cols-2 
    gap-10 
    lg:gap-16 
    items-center
    ">


      {/* ================= Left Content ================= */}

      <div>


        <span
          className="
          uppercase 
          tracking-[3px] 
          sm:tracking-[4px]
          text-[12px]
          sm:text-[13px]
          font-semibold 
          text-[#A66A2B]
          "
          style={{ fontFamily:"Poppins, sans-serif" }}
        >

          About The Farm

        </span>





        <h2
          className="
          mt-4
          sm:mt-5
          text-[34px]
          sm:text-[42px]
          md:text-[52px]
          leading-[1.2]
          font-semibold
          text-[#162316]
          "
          style={{ fontFamily:"Fraunces, serif" }}
        >

          A family farm built on healthy
          animals and honest dealing

        </h2>






        <p
          className="
          mt-6
          sm:mt-8
          text-[16px]
          sm:text-[18px]
          leading-[30px]
          sm:leading-[36px]
          text-[#67625D]
          "
          style={{fontFamily:"Poppins, sans-serif"}}
        >

          We keep a small, carefully managed herd of premium dairy
          cattle raised with care and proper nutrition. Every animal is
          hand-raised, fully vaccinated and regularly checked to ensure
          excellent health before being offered for sale. Buyers are
          always welcome to visit our farm and see our cattle before
          making a decision.

        </p>







        {/* Features */}

        <div className="
        grid 
        grid-cols-1
        sm:grid-cols-2
        gap-5
        mt-8
        sm:mt-10
        ">


          {[
            "Healthy & Vaccinated",
            "Premium Breeds",
            "Experienced Farmers",
            "Vet Certified"
          ].map((item,index)=>(

            <div 
            key={index}
            className="
            flex
            items-center
            gap-3
            "
            >

              <FaCheckCircle 
              className="
              text-[#255F38]
              text-xl
              flex-shrink-0
              "
              />

              <span
              className="
              text-[#162316]
              font-medium
              text-sm
              sm:text-base
              "
              style={{fontFamily:"Poppins, sans-serif"}}
              >

                {item}

              </span>


            </div>

          ))}



        </div>







        {/* Stats */}

        <div className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-8
        mt-10
        sm:mt-14
        text-center
        sm:text-left
        ">


          {[
            ["05+","Years Farming"],
            ["200+","Animals Sold"],
            ["100%","Vet Certified"]
          ].map((stat,index)=>(


            <div key={index}>


              <h3
              className="
              text-[42px]
              sm:text-[50px]
              font-semibold
              text-[#255F38]
              "
              style={{fontFamily:"Fraunces, serif"}}
              >

                {stat[0]}

              </h3>



              <p
              className="
              uppercase
              text-[12px]
              sm:text-[13px]
              tracking-wide
              text-[#67625D]
              "
              style={{fontFamily:"Poppins, sans-serif"}}
              >

                {stat[1]}

              </p>


            </div>


          ))}


        </div>




      </div>







      {/* ================= Right Image ================= */}


      <div className="relative">


        <img
        src={aboutImg}
        alt="Shahan Cattle Farm"
        className="
        w-full
        h-[320px]
        sm:h-[420px]
        md:h-[560px]
        object-cover
        rounded-[25px]
        sm:rounded-[30px]
        transition-transform
        duration-700
        hover:scale-105
        "
        />


      </div>



    </div>


  </div>


</section>


{/* ======================= ABOUT SECTION END ======================= */}


{/* ================= FEATURED COWS SECTION START ================= */}

<FeaturedCows />

{/* ================= FEATURED COWS SECTION END ================= */}


  <WhyChooseUs />


  {/* Contact CTA */}
      <ContactCTA />



{/* ================= Footer SECTION START ================= */}

<Footer />
{/* ================= Footer COWS SECTION END ================= */}





    </>
  );
};

export default Home;