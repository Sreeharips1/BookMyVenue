const CategoryChip = ({ Icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2
        px-5
        py-3
        rounded-full
        border
        transition-all
        duration-300

        ${
          active
            ? "bg-[#CE2626] border-[#CE2626] text-white shadow-lg shadow-red-600/20"
            : "border-slate-700 text-slate-300 hover:border-[#CE2626] hover:text-white"
        }
      `}
    >
      <Icon size={18} />

      <span>{label}</span>
    </button>
  );
};

export default CategoryChip;
