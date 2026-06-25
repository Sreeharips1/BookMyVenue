import axiosInstance from "../../api/axios";

export const registerUserApi = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);

  console.log(response.data);

  return response.data;
};

export const loginUserApi = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);

  return response.data;
};

export const getProfileApi = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

export const updateProfileApi = async (data) => {
  const response = await axiosInstance.put("/auth/profile", data);

  return response.data;
};

export const changePasswordApi = async (data) => {
  const response = await axiosInstance.put("/auth/change-password", data);

  return response.data;
};
