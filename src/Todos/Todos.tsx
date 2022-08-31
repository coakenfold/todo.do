import { useEffect, useState, useReducer, createContext } from "react";
import {
  storeReducer,
  storeState,
  LOCALSTORAGE,
  iState,
  iStateAction,
} from "./todoStore";
import { TodoGroup, TodoTitle } from "./Todos.styled";
import { TodoLists } from "./TodoLists";
import { TodoList } from "./TodoList";

export interface iStateContext {
  state: iState;
  dispatch: undefined | React.Dispatch<iStateAction>;
}
export const StateContext = createContext<iStateContext>({
  state: storeState,
  dispatch: undefined,
});

export const Todos = () => {
  const [state, dispatch] = useReducer(storeReducer, storeState);
  const [listSelectedId, setListSelectedId] = useState<number>();

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(state));
    return () => {};
  }, [state]);

  const onClickListView = (id: number) => {
    setListSelectedId(id);
  };

  const selectedListData = state.lists.filter(({ id }) => {
    return id === listSelectedId;
  })[0];
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <TodoGroup>
        <TodoTitle>Todo.Do</TodoTitle>
        <TodoLists onClickListView={onClickListView} />
        {selectedListData ? <TodoList list={selectedListData} /> : <></>}
      </TodoGroup>
    </StateContext.Provider>
  );
};
