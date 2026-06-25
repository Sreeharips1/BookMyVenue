import axiosInstance from "../../api/axios";

export const getAllVenuesApi = async () => {
  const response = await axiosInstance.get("/venues");
  return response.data;
};

export const getVenueByIdApi = async (id) => {
  const response = await axiosInstance.get(`/venues/${id}`);

  return response.data;
};

export const createVenueApi = async (venueData) => {
  const response = await axiosInstance.post("/venues", venueData);

  return response.data;
};

export const getMyVenuesApi = async () => {
  const response = await axiosInstance.get("/venues/my-venues");

  return response.data;
};

export const deleteVenueApi = async (id) => {
  const response = await axiosInstance.delete(`/venues/${id}`);

  return response.data;
};

export const updateVenuesApi = async (id, venueData) => {
  const response = await axiosInstance.put(`/venues/${id}`, venueData);
  return response.data;
};

export const getBookedSlotsApi = async (venueId, date) => {
  const response = await axiosInstance.get(
    `/venues/${venueId}/booked-slots?date=${date}`,
  );

  return response.data;
};

export const uploadImagesApi = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await axiosInstance.post("/upload/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
