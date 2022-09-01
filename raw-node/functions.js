const fetch = require("node-fetch");

const fetchTodos = async (dispatch, getState) => {
  console.log("I am fetching your action!");

  // আমাদের last function call action এর আগে আমরা async ব্যবহার করেছি। কারন await ব্যবহার করলে তা async function হতে হয়।
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=9"
  );

  const todos = await response.json();

 dispatch({
    type: "todos/todoLoaded",
    payload: todos,
  });

  console.log("Number of users:", getState().todos.length);
}

module.exports = {
  fetchTodos,
}