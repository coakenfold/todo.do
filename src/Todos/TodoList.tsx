import { useState, useContext } from "react";
import { storeActions, iStateListItem } from "./todoStore";
import { StateContext } from "./TodosProvider";
import { Todo } from "./Todo";
import {
  TodoListGroup,
  TodoListHeaderHeading,
  TodoListHeaderTitle,
  TodoListTodosList,
  TodoListNewTodoForm,
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
        <TodoListHeaderHeading>Todo List: To Dos</TodoListHeaderHeading>
        <TodoListHeaderTitle>{list.text}</TodoListHeaderTitle>
      </TodoListHeaderHeadingTitleGroup>

      <TodoListNewTodoForm
        onSubmit={(event) => {
          event?.preventDefault();
        }}
      >
        <label htmlFor="newTodoItem" className="sr-only">
          Add a To Do to "{list.text}" List
        </label>
        <TodoListNewTodoInput
          placeholder="New To Do Name"
          type="text"
          onChange={(event) => {
            onChangeText(event.target.value);
          }}
          value={textTodo}
          id="newTodoItem"
        />
        <TodoListNewTodoButton
          onClick={onClickAddItem}
          disabled={textTodo === ""}
        >
          Create <span className="sr-only">{textTodo} </span>To Do
        </TodoListNewTodoButton>
      </TodoListNewTodoForm>

      <TodoListMultiselectActionGroup>
        <div>
          {list.todos.length > 1 ? (
            <TodoListMultiselectSelectAllButton
              onClick={() => {
                onClickToggleMultiselectAll({ idList: list.id });
              }}
            >
              {currentMultiselectTodos.length === list.todos.length
                ? `Deselect all To Dos`
                : `Select all To Dos`}
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
                  ? "Mark selected To Dos as not done"
                  : "Mark selected To Dos as done"}
              </TodoListMultiselectMarkCompleteButton>

              <TodoListMultiselectDeleteButton
                onClick={onClickToggleMultiselectDelete}
              >
                {currentMultiselectTodos.length > 1
                  ? "Delete selected To Dos"
                  : "Delete selected To Do"}
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
