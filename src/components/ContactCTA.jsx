import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const ContactCTA = () => {
  return (
    <section className="w-full bg-[#F8F5E9] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-[26px] bg-[#7B4F30] px-6 py-14 text-center shadow-[0_15px_35px_rgba(80,50,30,0.10)] md:px-10 md:py-16">

          {/* Heading */}
          <h2 className="mx-auto max-w-[700px] font-serif text-[28px] font-bold leading-[1.2] text-[#FFFDF5] md:text-[34px]">
            Found a cow you like? Talk to us today
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-[1.55] text-[#F2E7DA]">
            Send a message and we'll share live video, current milk yield and
            delivery options for any animal on the list.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {/* WhatsApp - NEW TAB */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[44px] min-w-[136px] items-center justify-center gap-2 rounded-full bg-[#20C66B] px-5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#18B961]"
            >
              <FaWhatsapp className="text-[17px]" />
              WhatsApp
            </a>

            {/* Call Now - SAME TAB */}
            <a
              href="tel:+923001234567"
              className="flex h-[44px] min-w-[126px] items-center justify-center gap-2 rounded-full bg-[#E1B75A] px-5 text-[13px] font-semibold text-[#3E2B1E] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D8AA45]"
            >
              <FaPhoneAlt className="text-[13px]" />
              Call Now
            </a>

            {/* Contact Us - SAME PAGE */}
            <a
              href="/contact"
              className="flex h-[44px] min-w-[123px] items-center justify-center rounded-full border border-[#CDB49D] px-5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#7B4F30]"
            >
              Contact Us
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;