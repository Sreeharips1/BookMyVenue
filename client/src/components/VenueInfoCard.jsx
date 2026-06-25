const VenueInfoCard = ({ venue }) => {
  return (
    <div className="bg-[#13203D] rounded-3xl p-6 border border-slate-800">
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <span className="bg-[#CE262620] text-[#CE2626] px-3 py-1 rounded-full text-sm">
          {venue.category}
        </span>

        <span className="text-yellow-400">⭐ {venue.rating}</span>

        <span className="text-slate-300">👥 {venue.capacity} Guests</span>
      </div>

      <h1 className="text-4xl font-bold text-white">{venue.title}</h1>

      <p className="text-slate-400 mt-3">📍 {venue.location}</p>

      <div className="mt-6">
        <span className="text-[#CE2626] text-4xl font-bold">
          ₹{venue.price}
        </span>

        <span className="text-slate-400 ml-2">/ slot</span>
      </div>

      <p className="mt-6 text-slate-300 leading-7">{venue.description}</p>
    </div>
  );
};

export default VenueInfoCard;
