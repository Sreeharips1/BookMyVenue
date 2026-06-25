import axiosInstance from "../../api/axios";

export const getOwnerAnalyticsApi = async () => {
  const response = await axiosInstance.get("/dashboard/owner/analytics");

  return response.data;
};

export const getUserDashboardApi = async () => {
  const response = await axiosInstance.get("/dashboard/userdashboard");

  return response.data;
};
