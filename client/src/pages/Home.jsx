import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import VenueCard from "../components/VenueCard";
import VenueGrid from "../components/VenueGrid";

import { getAllVenuesApi } from "../features/venue/venueApi";

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [price, setPrice] = useState(1000000);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getAllVenuesApi();
        setVenues(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const matchSearch =
        venue.title.toLowerCase().includes(search.toLowerCase()) ||
        venue.location.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "all" ||
        venue.category?.toLowerCase() === selectedCategory;

      const matchPrice = venue.price <= price;

      return matchSearch && matchCategory && matchPrice;
    });
  }, [venues, search, selectedCategory, price]);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-[#13203D] to-[#09122C]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold">Find Your Perfect Venue</h1>

          <p className="mt-6 text-xl text-slate-300">
            Book banquet halls, sports arenas, rooftops, restaurants and more in
            minutes.
          </p>
        </div>
      </section>

      {/* Discover */}
      <section id="discover" className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-4xl font-bold mb-8">Discover Venues</h2>

        <SearchBar searchTerm={search} setSearchTerm={setSearch} />

        <div className="mt-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="mt-6">
          <PriceFilter maxPrice={price} setMaxPrice={setPrice} />
        </div>

        {loading ? (
          <div className="text-center py-20 text-white">Loading...</div>
        ) : (
          <VenueGrid
            venues={filteredVenues}
            onVenueClick={(venue) => navigate(`/venue/${venue._id}`)}
          />
        )}
      </section>
    </PublicLayout>
  );
};

export default Home;
