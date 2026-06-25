import DashboardLayout from "../../layouts/DashboardLayout";
import VenueCard from "../../components/VenueCard";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getMyVenuesApi } from "../../features/venue/venueApi";
import { setVenues } from "../../features/venue/venueSlice";
import { useEffect } from "react";
import { deleteVenueApi } from "../../features/venue/venueApi";
import { updateVenuesApi } from "../../features/venue/venueApi";

const MyVenues = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { venues } = useSelector((state) => state.venue);

  useEffect(() => {
    const fetchVenues = async () => {
      const data = await getMyVenuesApi();

      dispatch(setVenues(data));
    };

    fetchVenues();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?",
    );

    if (!confirmDelete) return;

    try {
      await deleteVenueApi(id);

      const updatedVenues = venues.filter((venue) => venue._id !== id);

      dispatch(setVenues(updatedVenues));
    } catch (error) {
      console.error(error);
    }
  };
  const handleupdate = async (id) => {
    try {
      await navigate(`/owner/edit-venue/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout
      role="owner"
      title="My Venues"
      subtitle="Manage all your listed venues"
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/owner/add-venue")}
            className="
            bg-[#CE2626]
            px-5 py-3
            rounded-xl
            text-white
            font-medium
            hover:bg-red-700
            transition
          "
          >
            + Add Venue
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue._id || venue.id}>
              <VenueCard {...venue} />

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleupdate(venue._id)}
                  className="
                  flex-1
                  bg-slate-700
                  hover:bg-slate-600
                  py-2
                  rounded-lg
                  text-white
                  transition
                "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(venue._id)}
                  className="
                  flex-1
                  bg-red-600
                  hover:bg-red-700
                  py-2
                  rounded-lg
                  text-white
                  transition
                "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyVenues;
