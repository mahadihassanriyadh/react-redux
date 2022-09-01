const { createStore, applyMiddleware } = require("redux");
const { fetchTodos } = require("./functions");
const thunk = require("redux-thunk");

// initial state
const initialState = {
  todos: [],
};

const newIdGenerator = (todo) => {
  return todo.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
};

// reducer
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/addTodo":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: newIdGenerator(state.todos),
            title: action.payload,
            completed: false,
          },
        ],
      };

    // todoLoaded কী? todoLoaded হচ্ছে এমন কিছু data, যা আমরা server থেকে পাচ্ছি। এই data কে আমরা আমাদের state এ অথবা store এ রাখব।
    case "todos/todoLoaded":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    default:
      return state;
  }
};

// store
// here thunk is just a middleware function imported from redux-thunk. It is used to make asynchronous actions. It works similar to our previous function fetchAsyncMiddleware. Thunk sends dispatch and getState as arguments respectively to the functon automatically.
const store = createStore(todoReducer, applyMiddleware(thunk.default));

// subscribe
store.subscribe(() => {
  console.log(store.getState());
});

// action creator
const addTodo = (title) => {
  return {
    type: "todos/addTodo",
    payload: title,
  };
};

// action dispatch
// store.dispatch(addTodo("Learn Redux"));
// store.dispatch(addTodo("Learn React"));
// store.dispatch(addTodo("Learn Node"));
store.dispatch(fetchTodos);
