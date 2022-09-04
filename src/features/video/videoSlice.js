import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideo } from "./videoAPI";

const initialState = {
  video: {},
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchVideoAsync = createAsyncThunk(
  "video/fetchVideo",
  async (videoId) => {
    const video = await getVideo(videoId);
    return video;
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    // before building cases we need to create the thunk
    builder
      .addCase(fetchVideoAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchVideoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideoAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.video = {};
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default videoSlice.reducer;
