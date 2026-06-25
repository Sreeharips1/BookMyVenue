import { FiSearch } from "react-icons/fi";

const SearchBar = ({ setSearchTerm, searchTerm }) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        placeholder="Search venues or location..."
        className="w-full bg-[#13203D] border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#CE2626]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
