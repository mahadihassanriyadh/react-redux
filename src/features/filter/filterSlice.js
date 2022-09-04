import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTags: [],
  search: "",
};

const filterSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    tagSelected: (state, action) => { 
      state.selectedTags.push(action.payload);
    },
    tagRemoved: (state, action) => { 
      const indexToRemove = state.selectedTags.indexOf(action.payload);

      if (indexToRemove !== -1) {
        state.selectedTags.splice(indexToRemove, 1);
      }
    },
    searched: (state, action) => { 
      state.search = action.payload;
    },
  }
});

export default filterSlice.reducer;
export const { tagSelected, tagRemoved, searched } = filterSlice.actions;
