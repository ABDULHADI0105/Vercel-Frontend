import React from "react";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";


const Footer = () => {

  return (
    <footer className="bg-[#1f5d2b] text-white">


      {/* Main Footer */}
      <div className="
      max-w-7xl mx-auto 
      px-5 sm:px-8 lg:px-10
      py-12 sm:py-14
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      gap-10 lg:gap-16
      ">


        {/* Logo About */}
        <div className="text-center sm:text-left">


          <div className="
          flex 
          items-center 
          justify-center 
          sm:justify-start 
          gap-3 
          mb-6
          ">


            <div className="
            w-12 h-12 
            rounded-full 
            border 
            border-[#d6b34c]
            flex 
            items-center 
            justify-center
            text-[#d6b34c]
            font-bold
            text-2xl
            ">

              S

            </div>


            <h2 className="
            text-xl 
            sm:text-2xl
            font-serif 
            font-bold
            ">

              Shahan Cattle Farm

            </h2>


          </div>



          <p className="
          text-gray-200
          text-sm
          leading-7
          max-w-sm
          mx-auto
          sm:mx-0
          ">

            Healthy, hand-raised livestock from our trusted farm.
            Every animal is carefully selected with complete
            health records and vaccination documentation.

          </p>



          {/* Social Icons */}

          <div className="
          flex 
          justify-center 
          sm:justify-start
          gap-4
          mt-6
          ">


            <a
            href="#"
            className="
            w-10 h-10
            rounded-full
            border
            border-white/30
            flex
            items-center
            justify-center
            hover:bg-[#d6b34c]
            hover:text-black
            transition-all
            duration-300
            ">

              <FaFacebookF/>

            </a>



            <a
            href="#"
            className="
            w-10 h-10
            rounded-full
            border
            border-white/30
            flex
            items-center
            justify-center
            hover:bg-[#d6b34c]
            hover:text-black
            transition-all
            duration-300
            ">

              <FaInstagram/>

            </a>



            <a
            href="#"
            className="
            w-10 h-10
            rounded-full
            border
            border-white/30
            flex
            items-center
            justify-center
            hover:bg-[#d6b34c]
            hover:text-black
            transition-all
            duration-300
            ">

              <FaYoutube/>

            </a>


          </div>


        </div>






        {/* Quick Links */}

        <div className="text-center sm:text-left">


          <h3 className="
          text-[#d6b34c]
          tracking-[4px]
          text-sm
          font-bold
          mb-6
          ">

            QUICK LINKS

          </h3>



          <ul className="space-y-4 text-sm">


            <li>
              <Link 
              to="/"
              className="
              hover:text-[#d6b34c]
              transition
              ">

              Home

              </Link>
            </li>



            <li>
              <Link 
              to="/cows"
              className="
              hover:text-[#d6b34c]
              transition
              ">

              Cows

              </Link>
            </li>



            <li>
              <Link 
              to="/contact"
              className="
              hover:text-[#d6b34c]
              transition
              ">

              Contact

              </Link>
            </li>


          </ul>


        </div>







        {/* Contact */}

        <div className="text-center sm:text-left">


          <h3 className="
          text-[#d6b34c]
          tracking-[4px]
          text-sm
          font-bold
          mb-6
          ">

            CONTACT

          </h3>



          <div className="
          space-y-5
          text-sm
          ">



            <p className="
            flex
            justify-center
            sm:justify-start
            gap-3
            ">

              <FaMapMarkerAlt className="text-[#d6b34c] mt-1"/>

              Shahan Cattle Farm, Texas USA

            </p>





            <p className="
            flex
            justify-center
            sm:justify-start
            gap-3
            ">

              <FaPhoneAlt className="text-[#d6b34c]"/>

              03073841913

            </p>





            <p className="
            flex
            justify-center
            sm:justify-start
            gap-3
            ">

              <FaEnvelope className="text-[#d6b34c]"/>

              info@shahancattle.com

            </p>



          </div>





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


            <FaWhatsapp size={20}/>

            WhatsApp Us


          </a>



        </div>



      </div>






      {/* Bottom Footer */}


      <div className="
      border-t
      border-white/20
      ">


        <div className="
        max-w-7xl
        mx-auto
        px-5 sm:px-8 lg:px-10
        py-6
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-3
        text-center
        text-xs
        text-gray-300
        ">


          <p>

          © 2026 Shahan Cattle Farm. All rights reserved.

          </p>



          <p>

          Livestock sold with verified health documentation.

          </p>



        </div>


      </div>



    </footer>
  );
};


export default Footer;