const { createSlice } = require("@reduxjs/toolkit");
const { counterActions } = require("../counter/counterSlice");
// initial state
const initialState = {
  count: 0,
};

// creating our slice
const dynamicCounterSlice = createSlice({
  // name of the slice
  name: "dynamicCounter",
  initialState,
  // previously with redux we had to use switch statements in our reducer function. But with redux toolkit we pass in functions. The key is the name of the action and the value is the function that will be called when that action is dispatched. The function will receive the current state and the action object as arguments.
  reducers: {
    increment: (state, action) => {
      state.count += action.payload;
    },
    decrement: (state, action) => {
      state.count -= action.payload;
    },
  },

  // this is where we can handle other actions that are not part of this slice. For example, if we wanted to handle the increment action from the counter slice, we could do it here. Means we want to respond to the increment action from the counter slice in the dynamicCounter slice. We can do that by using the extraReducers property. We can pass in an object with the key being the action type and the value being the function that will be called when that action is dispatched. The function will receive the current state and the action object as arguments.

  // Way 1 - Hard Coded
  /*   extraReducers: {
    ["counter/increment"]: (state, action) => {
      state.count += 1;
    },
  }, */

  // Way 2 (recommended)
  extraReducers: (builder) => {
    builder.addCase(counterActions.increment, (state, action) => {
      state.count += 1;
    });
  },
});

// এটা মনে হতে পারে যে, উপরে আমরা reducers দিলাম, তবে এখানে কেন reducer লিখছি? আসলে উপরে createSlicer এর ভিতর আমরা আমাদের প্রয়োজনীয় reducers গুলো দিয়ে দিয়েছি। কিন্তু ultimately createSlice আমাদের reducers গুলো গ্রহণ করে, আমাদের একটাই reducer return করে। এই reducer টা আমরা ব্যবহার করব।

// this is the way of default exports in nodejs
module.exports = dynamicCounterSlice.reducer;

// this is the way of named exports in nodejs
module.exports.dynamicCounterActions = dynamicCounterSlice.actions;
