import { useContext } from "react";
import { TodoGroup, TodoTitle } from "./Todos.styled";
import { TodoLists } from "./TodoLists";
import { TodoList } from "./TodoList";
import { StateContext } from "./TodosProvider";
export const Todos = () => {
  const { state } = useContext(StateContext);
  return (
    <TodoGroup>
      <TodoTitle>Todo.Do</TodoTitle>
      <TodoLists />
      {state.activeList ? <TodoList idList={state.activeList} /> : <></>}
    </TodoGroup>
  );
};
