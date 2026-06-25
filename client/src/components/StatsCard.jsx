const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-[#13203D] border border-slate-800 rounded-2xl p-6">
      <p className="text-slate-400">{title}</p>

      <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>
    </div>
  );
};

export default StatsCard;
