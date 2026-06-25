const VenueGallery = ({ images }) => {
  return (
    <div className="bg-[#13203D] rounded-3xl p-6 border border-slate-800">
      <h2 className="text-2xl font-semibold text-white mb-5">Gallery</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`gallery-${index}`}
            className="h-48 w-full object-cover rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default VenueGallery;
