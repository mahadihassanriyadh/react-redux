import initialState from "./initialState";
import {
  ALLCOMPLETED,
  CLEARCOMPLETED,
  COLORSELECTED,
  DELETED,
  ADDED,
  TOGGLED,
  LOADED,
} from "./actionTypes";

function nextTodoId(todos) {
  console.log(todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1))
  return todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1) + 1;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return [...action.payload];
    case ADDED:
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ];
    case TOGGLED:
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    case COLORSELECTED:
      const { todoId, color } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }
        if (todo.color === color) { 
          return {
            ...todo,
            color: null,
          };
        }
        return {
          ...todo,
          color,
        };
      });
    case DELETED:
      return state.filter((todo) => todo.id !== action.payload);
    case ALLCOMPLETED:
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      });
    case CLEARCOMPLETED:
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

export default reducer;
