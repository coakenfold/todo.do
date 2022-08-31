import { useState, useContext } from "react";
import { storeActions, iStateListItem } from "./todoStore";
import { StateContext } from "./Todo";
import { TodoItem } from "./TodoItem";
import {
  TodoListContainer,
  TodoListTitleContainer,
  TodoListTitleHeading,
  TodoListTitleText,
  TodoListTodosContainer,
  TodoListItemCreateContainer,
  TodoListItemCreateInput,
  TodoListItemCreateButton,
} from "./TodoList.styled";

export interface iTodoListItem {
  id: number;
  order: number;
  isDone: boolean;
  text: string;
}
export interface iTodoListProps {
  list: iStateListItem;
}
export const TodoList = ({ list }: iTodoListProps) => {
  const { dispatch } = useContext(StateContext);
  const [textTodo, setTextTodo] = useState("");
  const onChangeText = (value: string) => {
    setTextTodo(value);
  };
  const onClickAddItem = () => {
    dispatch?.({
      type: storeActions.todoCreate,
      payload: {
        listId: list.id,
        id: Date.now(),
        isDone: false,
        text: textTodo,
      },
    });
    setTextTodo("");
  };
  // const onClickMultiSelectItem = ({
  //   id,
  //   isChecked,
  // }: {
  //   id: number;
  //   isChecked: boolean;
  // }) => {
  //   console.log("onClickMultiSelectItem", {
  //     id,
  //     isChecked,
  //   });
  // };
  return (
    <TodoListContainer>
      <TodoListTitleContainer>
        <TodoListTitleHeading>Todo.List</TodoListTitleHeading>
        <TodoListTitleText>{list.text}</TodoListTitleText>
      </TodoListTitleContainer>

      <TodoListItemCreateContainer>
        <TodoListItemCreateInput
          type="text"
          placeholder="New todo item"
          onChange={(event) => {
            onChangeText(event.target.value);
          }}
          value={textTodo}
        />
        <TodoListItemCreateButton
          onClick={(event) => {
            event.preventDefault();
            onClickAddItem();
          }}
          disabled={textTodo === ""}
        >
          {"Add Todo " + (list.todos.length + 1)}
        </TodoListItemCreateButton>
      </TodoListItemCreateContainer>

      <TodoListTodosContainer>
        {list.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} listId={list.id} />
        ))}
      </TodoListTodosContainer>
    </TodoListContainer>
  );
};
