import { useEffect, useState } from "react";

import { Trash2 } from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { createVenueApi } from "../../features/venue/venueApi";

import { updateVenuesApi } from "../../features/venue/venueApi";

import { getVenueByIdApi } from "../../features/venue/venueApi";

import { uploadImagesApi } from "../../features/venue/venueApi";

import { formatTime } from "../../utils/formatTime";

const AddEditVenue = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    capacity: "",
    price: "",
    description: "",

    amenities: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [slots, setSlots] = useState([
    {
      startTime: "",
      endTime: "",
    },
  ]);

  const navigate = useNavigate();

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSlot = () => {
    setSlots([
      ...slots,
      {
        startTime: "",
        endTime: "",
      },
    ]);
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];

    updatedSlots[index][field] = value;

    setSlots(updatedSlots);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreview((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreview = imagePreview.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImagePreview(updatedPreview);
  };

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) return;

      try {
        const venue = await getVenueByIdApi(id);

        setFormData({
          title: venue.title || "",
          location: venue.location || "",
          category: venue.category || "",
          capacity: venue.capacity || "",
          price: venue.price || "",
          description: venue.description || "",

          amenities: venue.amenities?.join(", ") || "",
        });

        setImagePreview(venue.images || []);

        setSlots(
          venue.availableSlots || [
            {
              startTime: "",
              endTime: "",
            },
          ],
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchVenue();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedImages = imagePreview;

      if (images.length > 0) {
        setUploading(true);
        const uploadResponse = await uploadImagesApi(images);
        console.log(uploadResponse);

        uploadedImages = uploadResponse.images;

        setUploading(false);
      }
      const payload = {
        title: formData.title,
        location: formData.location,
        category: formData.category,
        capacity: Number(formData.capacity),
        price: Number(formData.price),
        description: formData.description,
        images: uploadedImages,

        amenities: formData.amenities.split(",").map((item) => item.trim()),

        availableSlots: slots,
      };

      if (isEditMode) {
        await updateVenuesApi(id, payload);
      } else {
        await createVenueApi(payload);
      }

      navigate("/owner/venues");
    } catch (error) {
      console.error(error);
      alert("Failed to save venue");
    }
  };

  return (
    <DashboardLayout
      role="owner"
      title={isEditMode ? "Edit Venue" : "Add Venue"}
      subtitle={
        isEditMode ? "Update venue details" : "Create a new venue listing"
      }
    >
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
        <div className="bg-[#13203D] p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6">
            Venue Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="title"
              placeholder="Venue Name"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            >
              <option value="">Select Category</option>
              <option value="Banquet Hall">Banquet Hall</option>
              <option value="Conference Hall">Conference Hall</option>
              <option value="Sports">Sports</option>
              <option value="Rooftop">Rooftop</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Auditorium">Auditorium</option>
              <option value="Party Hall">Party Hall</option>
              <option value="Wedding Venue">Wedding Venue</option>
              <option value="Wedding Venue">Cafe</option>
            </select>
            <input
              type="text"
              name="amenities"
              placeholder="WiFi, Parking, AC, Catering"
              value={formData.amenities}
              onChange={handleChange}
              className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <input
              type="number"
              name="price"
              placeholder="Price Per Slot"
              value={formData.price}
              onChange={handleChange}
              className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
            />

            <div className="md:col-span-2">
              <label className="block text-white mb-3">Venue Images</label>

              <label
                className="
      flex flex-col
      items-center
      justify-center
      h-40
      border-2
      border-dashed
      border-slate-600
      rounded-xl
      cursor-pointer
      hover:border-[#CE2626]
      transition
    "
              >
                <span className="text-slate-300">
                  Click to upload venue images
                </span>

                <span className="text-sm text-slate-500 mt-2">
                  JPG, PNG, WEBP
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreview.length > 0 && (
              <div className="md:col-span-2 mt-6">
                <h3 className="text-white font-semibold mb-3">
                  Selected Images ({imagePreview.length})
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagePreview.map((image, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-xl border border-slate-700"
                    >
                      <img
                        src={image}
                        alt={`Venue ${index + 1}`}
                        className="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="
              absolute
              top-2
              right-2
              h-8
              w-8
              rounded-full
              bg-red-600
              hover:bg-red-700
              text-white
              font-bold
              transition
            "
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {images.length > 0 && (
            <p className="text-sm text-green-400 mt-3">
              {images.length} image{images.length > 1 ? "s" : ""} selected
            </p>
          )}

          <textarea
            name="description"
            rows="5"
            placeholder="Venue Description"
            value={formData.description}
            onChange={handleChange}
            className="mt-5 w-full bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
          />
        </div>

        {/* Slots */}

        <div className="bg-[#13203D] p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Available Slots</h2>

            <button
              type="button"
              onClick={addSlot}
              className="bg-[#CE2626] px-4 py-2 rounded-lg text-white"
            >
              + Add Slot
            </button>
          </div>

          <div className="space-y-4">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="bg-[#09122C]
    rounded-xl
    p-4
    border
    border-slate-700
    space-y-4"
              >
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleSlotChange(index, "startTime", e.target.value)
                  }
                  className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
                />
                <p className="text-sm text-green-400 mt-2">
                  {formatTime(slot.startTime)}
                </p>

                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleSlotChange(index, "endTime", e.target.value)
                  }
                  className="bg-[#09122C] border border-slate-700 rounded-xl p-3 text-white"
                />
                <p className="text-sm text-blue-400 mt-2">
                  {formatTime(slot.endTime)}
                </p>

                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  className="
    flex items-center justify-center gap-2
    rounded-xl
    border border-red-500
    bg-red-500/10
    px-4 py-3
    text-red-400
    font-medium
    transition-all duration-200
    hover:bg-red-500
    hover:text-white
    hover:shadow-lg hover:shadow-red-500/20
    active:scale-95
  "
                >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="
    w-full
    bg-[#CE2626]
    py-4
    rounded-xl
    text-white
    font-semibold
    text-lg
    disabled:opacity-50
  "
        >
          {uploading
            ? "Uploading Images..."
            : isEditMode
              ? "Update Venue"
              : "Save Venue"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default AddEditVenue;
