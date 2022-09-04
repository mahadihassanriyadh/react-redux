import axiosInstance from "../../utilities/axios";

export const getVideos = async (selectedTags, search) => {
  let queryString = "";
  if (selectedTags?.length > 0) {
    queryString += selectedTags.map((tag) => `tags_like=${tag}`).join("&");
  }
  if (search) {
    queryString += `&q=${search}`;
  }

  const response = await axiosInstance.get(`/videos?${queryString}`);

  return response.data;
};
