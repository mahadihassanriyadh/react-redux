import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import Todo from "./Todo";

const TodoList = () => {
  const { todos, filters } = useSelector((state) => state);
  const { status, colors } = filters;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos);
  }, [dispatch]);
  const filterByStatus = (todo) => {
    switch (status) {
      case "Complete":
        return todo.completed; // return true if completed (Another way of rewiting this, todo.completed === true)
      case "Incomplete":
        return !todo.completed; // return true if not completed (Another way of rewiting this, todo.completed === false)
      default:
        return true;
    }
  };
  
  const filterByColors = (todo) => {
    if (colors.length === 0) {
      return true;
    }
    return colors.includes(todo?.color);
  };
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {/* todo */}
      {todos
        .filter((todo) => filterByStatus(todo))
        .filter((todo) => filterByColors(todo))
        .map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
    </div>
  );
};

export default TodoList;
