import { useState, useContext } from "react";
import { storeActions, iStateListItem } from "./todoStore";
import { StateContext } from "./Todos";
import { Todo } from "./Todo";
import {
  TodoListGroup,
  TodoListHeaderGroup,
  TodoListHeaderHeading,
  TodoListHeaderTitle,
  TodoListTodosList,
  TodoListNewTodoGroup,
  TodoListNewTodoInput,
  TodoListNewTodoButton,
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
    <TodoListGroup>
      <TodoListHeaderGroup>
        <TodoListHeaderHeading>Todo.List</TodoListHeaderHeading>
        <TodoListHeaderTitle>{list.text}</TodoListHeaderTitle>
      </TodoListHeaderGroup>

      <TodoListNewTodoGroup>
        <TodoListNewTodoInput
          type="text"
          placeholder="New todo item"
          onChange={(event) => {
            onChangeText(event.target.value);
          }}
          value={textTodo}
        />
        <TodoListNewTodoButton
          onClick={(event) => {
            event.preventDefault();
            onClickAddItem();
          }}
          disabled={textTodo === ""}
        >
          {"Add Todo " + (list.todos.length + 1)}
        </TodoListNewTodoButton>
      </TodoListNewTodoGroup>

      <TodoListTodosList>
        {list.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} listId={list.id} />
        ))}
      </TodoListTodosList>
    </TodoListGroup>
  );
};
