import VenueCard from "./VenueCard";

const VenueGrid = ({ venues, onVenueClick }) => {
  if (!venues.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl text-white font-semibold">No venues found</h2>

        <p className="text-slate-400 mt-2">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
      {venues.map((venue) => (
        <div
          key={venue._id}
          onClick={() => onVenueClick(venue)}
          className="cursor-pointer"
        >
          <VenueCard
            images={venue.images}
            title={venue.title}
            location={venue.location}
            category={venue.category}
            price={venue.price}
            slots={venue.availableSlots?.length || 0}
          />
        </div>
      ))}
    </div>
  );
};

export default VenueGrid;
