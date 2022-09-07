import { ReactNode, useContext } from "react";
import { TodoGroup, TodoTitle } from "./Todos.styled";
import { TodoLists } from "./TodoLists";
import { TodoList } from "./TodoList";
import { StateContext } from "./TodosProvider";
export const Main = ({
  children,
  isMain,
}: {
  children: ReactNode;
  isMain: boolean;
}) => {
  return isMain ? <main>{children}</main> : <>{children}</>;
};
export const RenderSwitch = ({
  children,
  isVisible,
}: {
  children: ReactNode;
  isVisible: boolean;
}) => {
  return isVisible ? <>{children}</> : <></>;
};
export const Todos = () => {
  const { state } = useContext(StateContext);
  const activeList = state.activeList as number;
  return (
    <TodoGroup>
      <TodoTitle>Todo.Do</TodoTitle>
      <Main isMain={activeList === 0}>
        <TodoLists />
      </Main>
      <RenderSwitch isVisible={activeList !== 0}>
        <Main isMain={activeList !== 0}>
          <TodoList idList={activeList} />
        </Main>
      </RenderSwitch>
    </TodoGroup>
  );
};
