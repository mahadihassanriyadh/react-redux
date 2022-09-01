import { colorselected } from "../actions";

const updateColor = (todoId, color) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({
        color: color,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    });
    const todo = await response.json();
  
    dispatch(colorselected(todo.id, todo.color));
  };
}

export default updateColor;
