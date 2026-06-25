const AmenitiesList = ({ amenities }) => {
  return (
    <div className="bg-[#13203D] rounded-3xl p-6 border border-slate-800">
      <h2 className="text-2xl font-semibold text-white mb-5">Amenities</h2>

      <div className="flex flex-wrap gap-3">
        {amenities.map((item) => (
          <span
            key={item}
            className="bg-slate-800 text-white px-4 py-2 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesList;
