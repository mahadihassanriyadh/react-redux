const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

// create async thunk
// fcreateAsyncThunk takes two arguments, the first is the name of the action creator and the second is an async function that returns a promise. We had to do a lot of stuffs in raw redux to achieve this. We used try catch (error) to get our desired results and dispatched three actions accordingly. But here RTK handle those things for us, with RTK the promise we will get will have three properties, pending, fullfilled and rejected (promise.pending, promise.fullfilled, promise.rejected). We can use these properties to get our desired results.
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts = await response.json();
  
  return posts;
});

// RTK has provided us with a createAsyncThunk function to create async actions as they have provided us with createSlice to create slice.
const postSlice = createSlice({
  name: "post",
  initialState,
  // we are using extraReducers to handle our async actions, because we these actions are not part of our slice. We are using the promise.pending, promise.fullfilled and promise.rejected properties to get our desired results. This actions will be fired automatically when we dispatch our async action creator.
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.posts = [];
    });
  }
});

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;
