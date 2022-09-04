import axiosInstance from "../../utilities/axios";

export const getTags = async () => {
  const response = await axiosInstance.get("/tags");

  return response.data;
};
