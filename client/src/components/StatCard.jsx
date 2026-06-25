const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#13203D] p-5 rounded-2xl border border-slate-800">
      <p className="text-slate-400">{title}</p>

      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
    </div>
  );
};

export default StatCard;
