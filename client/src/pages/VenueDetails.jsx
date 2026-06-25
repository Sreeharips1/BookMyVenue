import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import VenueInfoCard from "../components/VenueInfoCard";
import AmenitiesList from "../components/AmenitiesList";
import VenueGallery from "../components/VenueGallery";
import BookingSummary from "../components/BookingSummary";

import { getVenueByIdApi } from "../features/venue/venueApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookedSlotsApi } from "../features/venue/venueApi";
import { createBooking } from "../features/booking/bookingApi";

import { formatTime } from "../utils/formatTime";

import LoginRequiredModal from "../components/LoginRequiredModal";

const VenueDetails = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate || !id) return;

      try {
        const data = await getBookedSlotsApi(id, selectedDate);

        setSlots(data.slots);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, id]);

  const handleBooking = async () => {
    try {
      if (!selectedDate) {
        return alert("Please select a date");
      }

      if (!selectedSlot) {
        return alert("Please select a slot");
      }

      if (!user) {
        setShowLoginModal(true);
        return;
      }

      const [startTime, endTime] = selectedSlot
        .split("-")
        .map((item) => item.trim());

      await createBooking({
        venue: venue._id,
        date: selectedDate,
        startTime,
        endTime,
      });

      alert("Booking confirmed");

      navigate("/user/Mybooking");
    } catch (error) {
      console.error(error);

      alert(error.response?.date?.message || "Booking Failed");
    }
  };

  const [venue, setvenue] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) return;
      try {
        const venue = await getVenueByIdApi(id);
        console.log(venue);
        setvenue(venue);
        console.log(venue);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVenue();
  }, [id]);

  const today = new Date().toISOString().split("T")[0];

  if (venue) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <VenueInfoCard venue={venue} />

          <AmenitiesList amenities={venue.amenities} />

          <VenueGallery images={venue.images || []} />

          <div className="bg-[#13203D] rounded-3xl p-6 border border-slate-800">
            <h2 className="text-2xl font-bold mb-4">Select Date</h2>

            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <h2 className="text-2xl font-bold mt-8 mb-4">Available Slots</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {slots?.map((slot, index) => {
                const slotValue = `${slot.startTime}-${slot.endTime}`;

                const slotDisplay = `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`;

                const isToday = selectedDate === today;

                const currentTime = new Date();

                const [hour, minute] = slot.startTime.split(":");

                const slotDateTime = new Date();

                slotDateTime.setHours(Number(hour));
                slotDateTime.setMinutes(Number(minute));
                slotDateTime.setSeconds(0);

                const isPastSlot = isToday && slotDateTime < currentTime;

                return (
                  <button
                    key={index}
                    disabled={slot.isBooked || isPastSlot}
                    onClick={() => setSelectedSlot(slotValue)}
                    className={`p-4 rounded-xl border
transition-all
duration-300 ${
                      slot.isBooked
                        ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed"
                        : isPastSlot
                          ? "bg-slate-700 border-slate-600 text-gray-400 cursor-not-allowed"
                          : selectedSlot === slotValue
                            ? "bg-[#CE2626] border-[#CE2626] text-white"
                            : "bg-[#09122C] border-slate-700 text-green-400 hover:border-[#CE2626]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">{slotDisplay}</span>

                      <span className="text-xs mt-1">
                        {slot.isBooked
                          ? "Booked"
                          : isPastSlot
                            ? "Past Slot"
                            : "Available"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <BookingSummary
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            price={venue.price}
            onBook={handleBooking}
          />
          <LoginRequiredModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        </div>
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
        <div className="text-white p-10">Loading venue...</div>
      </MainLayout>
    );
  }
};
export default VenueDetails;
