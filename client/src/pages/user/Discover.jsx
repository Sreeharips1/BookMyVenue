import DashboardLayout from "../../layouts/DashboardLayout";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";
import VenueCard from "../../components/VenueCard";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setVenues,
  setVenueLoading,
  setVenueError,
} from "../../features/venue/venueSlice";

import { getAllVenuesApi } from "../../features/venue/venueApi";
import PriceFilter from "../../components/PriceFilter";

const Discover = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [maxPrice, setMaxPrice] = useState(1000000);

  const { venues, loading } = useSelector((state) => state.venue);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        dispatch(setVenueLoading(true));

        const data = await getAllVenuesApi();

        dispatch(setVenues(data));

        dispatch(setVenueLoading(false));
      } catch (error) {
        dispatch(setVenueError(error.message));
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      venue.category === selectedCategory ||
      venue.type === selectedCategory;

    const matchesPrice = venue.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <DashboardLayout
        role="user"
        title="Discover Venues"
        subtitle="Loading..."
      >
        <div className="text-white">Loading venues...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      role="user"
      title="Discover Venues"
      subtitle="Search by venue, category or location"
    >
      <div className="space-y-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue._id}
              onClick={() => navigate(`/venue/${venue._id}`)}
              className="cursor-pointer"
            >
              <VenueCard
                key={venue._id}
                id={venue._id}
                images={venue.images}
                title={venue.title}
                location={venue.location}
                category={venue.category || venue.type}
                price={venue.price}
                slots={venue.availableSlots?.length}
              />
            </div>
          ))}
        </div>
        {filteredVenues.length === 0 && (
          <div className="text-center text-slate-400 py-10">
            No venues found.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Discover;
