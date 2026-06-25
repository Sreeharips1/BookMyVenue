import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageCarousel = ({ images = [], height = "h-52" }) => {
  const [current, setCurrent] = useState(0);

  const validImages =
    images && images.length > 0
      ? images
      : ["https://placehold.co/600x400?text=No+Image"];

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (validImages.length <= 1) return;

    const timer = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(timer);
  }, [current, validImages.length]);

  return (
    <div className={`relative overflow-hidden ${height}`}>
      <img
        src={validImages[current]}
        alt=""
        className="w-full h-full object-cover transition-all duration-500"
      />

      {validImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevImage}
            className="
              absolute
              left-2
              top-1/2
              -translate-y-1/2
              bg-black/40
              hover:bg-black/60
              text-white
              rounded-full
              p-2
              transition
            "
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              bg-black/40
              hover:bg-black/60
              text-white
              rounded-full
              p-2
              transition
            "
          >
            <FiChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {validImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  current === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
