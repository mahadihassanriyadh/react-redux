const store = require("./app/store");
const { counterActions } =
  require("./features/counter/counterSlice");
const { dynamicCounterActions } = require("./features/dynamicCounter/dynamicCounterSlice");

// initial state
// console.log(store.getState());

// subscribe to the store for state changes
store.subscribe(() => {
  // console.log(store.getState());
});

// dispatching actions of normal counter
store.dispatch(counterActions.increment());

// dispatching actions of dynamic counter
// store.dispatch(dynamicCounterActions.increment(5));
// store.dispatch(dynamicCounterActions.increment(5));
// store.dispatch(dynamicCounterActions.increment(10));
// store.dispatch(dynamicCounterActions.decrement(15));
// store.dispatch(dynamicCounterActions.increment(100));