const categories = [
  "All",
  "Banquet Hall",
  "Conference Hall",
  "Sports",
  "Rooftop",
  "Restaurant",
  "Auditorium",
  "Party Hall",
  "Wedding Venue",
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          value={category}
          className={`px-5 py-2 rounded-full border transition ${
            selectedCategory === category
              ? "bg-[#CE2626] border-[#CE2626] text-white"
              : "border-slate-700 text-white hover:bg-[#CE2626]"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
