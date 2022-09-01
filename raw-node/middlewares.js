const delayActionMiddleware = (store) => (next) => (action) => {
  if (action.type === "todos/addTodo") {
    console.log("I am delaying your action!");
    setTimeout(() => {
      next(action);
    }, 2000);

    // এখানে return করে দিতে হবে, কারন এখানে return না করে দিলে, যেহেতু setTimeot() asynchronous function তাই দেখা যাবে তা if এর কাজ শেষ করে if এর scope থেকে বের হয়ে যাবে। এবং শেষ line এ গিয়ে return হয়ে যাবে/
    return;
  }
  return next(action);
};

const fetchAsyncMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

module.exports = {
  delayActionMiddleware,
  fetchAsyncMiddleware,
};
