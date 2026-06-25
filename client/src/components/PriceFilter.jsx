import React from "react";

const PriceFilter = ({ maxPrice, setMaxPrice }) => {
  return (
    <div className="border-2 border- p-4 rounded-xl">
      <label className="text-white block mb-2">
        Maximum Price: ₹{maxPrice}
      </label>

      <input
        type="range"
        min="0"
        max="1000000"
        step="500"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full sm:w-64 md:w-80 lg:w-96 accent-[#C5172E]"
      />
    </div>
  );
};

export default PriceFilter;
