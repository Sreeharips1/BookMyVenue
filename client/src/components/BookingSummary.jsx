const BookingSummary = ({ selectedDate, selectedSlot, price, onBook }) => {
  return (
    <div className="bg-[#13203D] rounded-3xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-slate-300">
          <span>Date</span>
          <span>{selectedDate || "--"}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>Slot</span>
          <span>{selectedSlot || "--"}</span>
        </div>

        <div className="border-t border-slate-700 pt-4 flex justify-between">
          <span className="text-white font-semibold">Total</span>

          <span className="text-[#CE2626] text-xl font-bold">₹{price}</span>
        </div>
      </div>

      <button
        onClick={onBook}
        className="w-full mt-6 bg-[#CE2626] hover:opacity-90 text-white py-4 rounded-xl font-semibold transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingSummary;
