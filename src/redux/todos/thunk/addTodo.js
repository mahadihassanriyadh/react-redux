import { added } from "../actions";

// First, we have an input which we need to pass to the thunk function so that the data can be stored in the database. But how do we do that? What we will do is create a function called addTodo which will return the thunk function. And we do not need to worry because redux-thunk will call the thunk function not te addToo function. Now we can receive necessary data from the input.
const addTodo = (todoText) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:9000/todos", {
      method: "POST",
      body: JSON.stringify({
        text: todoText,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    });
    const todo = await response.json();
  
    dispatch(added(todo.text));
  };
}

export default addTodo;
