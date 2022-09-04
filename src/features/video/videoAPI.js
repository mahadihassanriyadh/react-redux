import axiosInstance from "../../utilities/axios";

export const getVideo = async (videoId) => {
  const response = await axiosInstance.get(`/videos/${videoId}`);

  return response.data;
};
