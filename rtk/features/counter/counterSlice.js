const createSlice = require("@reduxjs/toolkit");

// initial state
const initialState = {
  value: 0,
};

// creating our slice
const counterSlice = createSlice({
  // name of the slice
  name: "counter",
  initialState,
  // previously with redux we had to use switch statements in our reducer function. But with redux toolkit we pass in functions. The key is the name of the action and the value is the function that will be called when that action is dispatched. The function will receive the current state and the action object as arguments.
  reducers: {
    increment: (state, action) => {
      state.count++;
    },
    decrement: (state, action) => { 
      state.count--;
    }
  }
});

// এটা মনে হতে পারে যে, উপরে আমরা reducers দিলাম, তবে এখানে কেন reducer লিখছি? আসলে উপরে createSlicer এর ভিতর আমরা আমাদের প্রয়োজনীয় reducers গুলো দিয়ে দিয়েছি। কিন্তু ultimately createSlice আমাদের reducers গুলো গ্রহণ করে, আমাদের একটাই reducer return করে। এই reducer টা আমরা ব্যবহার করব।

// this is the way of default exports in nodejs
module.exports = counterSlice.reducer;

// this is the way of named exports in nodejs
module.exports.counterActions = counterSlice.actions;
