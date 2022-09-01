import { useState, useContext } from "react";
import { storeActions, iStateListItem } from "./todoStore";
import { StateContext } from "./TodosProvider";
import { Todo } from "./Todo";
import {
  TodoListGroup,
  TodoListHeaderHeading,
  TodoListHeaderTitle,
  TodoListTodosList,
  TodoListNewTodoGroup,
  TodoListNewTodoInput,
  TodoListNewTodoButton,
  TodoListMultiselectActionGroup,
  TodoListMultiselectDeleteButton,
  TodoListMultiselectSelectAllButton,
  TodoListHeaderHeadingTitleGroup,
  TodoListMultiselectMarkCompleteButton,
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
export const TodoList = ({ idList }: { idList: number }) => {
  const { state, dispatch } = useContext(StateContext);
  const [textTodo, setTextTodo] = useState("");
  const onChangeText = (value: string) => {
    setTextTodo(value);
  };

  const list = state.lists.find(({ id }) => id === idList) as iStateListItem;

  const onClickAddItem = () => {
    dispatch?.({
      type: storeActions.todoCreate,
      payload: {
        idList: list.id,
        id: Date.now(),
        isDone: false,
        text: textTodo,
      },
    });
    setTextTodo("");
  };
  const onClickToggleMultiselectAll = ({ idList }: { idList: number }) => {
    dispatch?.({
      type: storeActions.todoToggleMultiselectAll,
      payload: { idList },
    });
  };

  const onClickToggleMultiselectDelete = () => {
    const multiselectItems = state.multiselectTodos || [];
    multiselectItems.forEach((idMultiselect) => {
      dispatch?.({
        type: storeActions.todoDelete,
        payload: { idList, id: idMultiselect },
      });
    });
  };
  const onClickToggleMultiselectComplete = ({
    isDone,
  }: {
    isDone: boolean;
  }) => {
    const multiselectItems = state.multiselectTodos || [];
    multiselectItems.forEach((idMultiselect) => {
      dispatch?.({
        type: storeActions.todoUpdate,
        payload: {
          idList,
          id: idMultiselect,
          isDone,
        },
      });
    });
  };

  const currentMultiselectTodos = state.multiselectTodos || [];
  const areAllTodosComplete = list.todos.every(({ isDone }) => isDone);
  return (
    <TodoListGroup>
      <TodoListHeaderHeadingTitleGroup>
        <TodoListHeaderHeading>Todo.List.Todos</TodoListHeaderHeading>
        <TodoListHeaderTitle>{list.text}</TodoListHeaderTitle>
      </TodoListHeaderHeadingTitleGroup>

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
          {"Add Todo " + ((list.todos.length || 0) + 1)}
        </TodoListNewTodoButton>
      </TodoListNewTodoGroup>

      <TodoListMultiselectActionGroup>
        <div>
          {list.todos.length > 1 ? (
            <TodoListMultiselectSelectAllButton
              onClick={() => {
                onClickToggleMultiselectAll({ idList: list.id });
              }}
            >
              {currentMultiselectTodos.length === list.todos.length
                ? `Deselect all Todos`
                : `Select all Todos`}
            </TodoListMultiselectSelectAllButton>
          ) : (
            <></>
          )}
          {currentMultiselectTodos && currentMultiselectTodos.length > 1 ? (
            <>
              <TodoListMultiselectMarkCompleteButton
                onClick={() => {
                  onClickToggleMultiselectComplete({
                    isDone: !areAllTodosComplete,
                  });
                }}
              >
                {areAllTodosComplete
                  ? "Mark selected Todos as not done"
                  : "Mark selected Todos as done"}
              </TodoListMultiselectMarkCompleteButton>

              <TodoListMultiselectDeleteButton
                onClick={onClickToggleMultiselectDelete}
              >
                {currentMultiselectTodos.length > 1
                  ? "Delete selected Todos"
                  : "Delete selected Todo"}
              </TodoListMultiselectDeleteButton>
            </>
          ) : (
            <></>
          )}
        </div>
      </TodoListMultiselectActionGroup>
      <TodoListTodosList>
        {list.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} idList={list.id} />
        ))}
      </TodoListTodosList>
    </TodoListGroup>
  );
};
