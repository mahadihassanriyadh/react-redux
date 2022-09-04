import axiosInstance from "../../utilities/axios";

export const getVideos = async () => {
  const response = await axiosInstance.get("/videos");

  return response.data;
};
