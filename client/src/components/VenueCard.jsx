import { FiMapPin, FiClock } from "react-icons/fi";

import ImageCarousel from "./ImageCarousel";

const VenueCard = ({ images, title, location, category, price, slots }) => {
  return (
    <div className="bg-[#13203D] rounded-2xl overflow-hidden border border-slate-800 hover:border-[#CE2626] transition-all duration-300">
      <ImageCarousel images={images} height="h-52" />

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-white">{title}</h3>

          <span className="px-3 py-1 rounded-full text-xs bg-[#CE262620] text-[#CE2626] border border-[#CE262650]">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 mt-3">
          <FiMapPin />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <p className="text-[#CE2626] text-2xl font-bold">₹{price}</p>

            <p className="text-slate-400 text-sm">per slot</p>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <FiClock />
            <span>{slots} Slots</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
