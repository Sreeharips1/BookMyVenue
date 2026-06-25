import axiosInstance from "../../api/axios";

export const createBooking = async (bookingData) => {
  const response = await axiosInstance.post("/book", bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await axiosInstance.get(`/book/my`);
  return response.data;
};

export const getOwnerBookings = async () => {
  const response = await axiosInstance.get(`/book/owner`);
  return response.data;
};
