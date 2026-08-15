import {
  FaHeartbeat,
  FaSyringe,
  FaLeaf,
  FaTruck,
} from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-[#225D31] py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* Heading */}
        <div className="mb-12">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[2px] text-[#E2A83B]">
            WHY CHOOSE US
          </p>

          <h2 className="font-serif text-[30px] font-bold leading-tight text-[#F8F6EF] md:text-[34px]">
            Buy with confidence, not guesswork
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Card 1 */}
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#397044]">
              <FaHeartbeat className="text-[19px] text-[#E2A83B]" />
            </div>

            <h3 className="mb-3 font-serif text-[17px] font-bold text-white">
              Vet Certified Health
            </h3>

            <p className="max-w-[260px] text-[13px] leading-[1.7] text-[#D5E1D7]">
              Every animal is examined by a licensed veterinarian and sold
              with written health certification.
            </p>
          </div>

          {/* Card 2 */}
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#397044]">
              <FaSyringe className="text-[19px] text-[#E2A83B]" />
            </div>

            <h3 className="mb-3 font-serif text-[17px] font-bold text-white">
              Complete Vaccination
            </h3>

            <p className="max-w-[260px] text-[13px] leading-[1.7] text-[#D5E1D7]">
              FMD, HS and brucellosis schedules completed and documented,
              with deworming dates on record.
            </p>
          </div>

          {/* Card 3 */}
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#397044]">
              <FaLeaf className="text-[19px] text-[#E2A83B]" />
            </div>

            <h3 className="mb-3 font-serif text-[17px] font-bold text-white">
              Pasture Raised
            </h3>

            <p className="max-w-[260px] text-[13px] leading-[1.7] text-[#D5E1D7]">
              Open grazing, natural fodder and mineral supplementation –
              never crowded, never rushed.
            </p>
          </div>

          {/* Card 4 */}
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#397044]">
              <FaTruck className="text-[19px] text-[#E2A83B]" />
            </div>

            <h3 className="mb-3 font-serif text-[17px] font-bold text-white">
              Safe Transport
            </h3>

            <p className="max-w-[260px] text-[13px] leading-[1.7] text-[#D5E1D7]">
              We arrange insured, low-stress delivery to your farm anywhere
              in the region.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;