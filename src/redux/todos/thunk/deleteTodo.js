import { deleted } from "../actions";

const deleteTodo = (todoId) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/${todoId}`, {
      method: "DELETE",
    });
    console.log(response.json());
    dispatch(deleted(todoId));
  };
}

export default deleteTodo;
