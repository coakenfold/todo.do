import { useEffect, useRef, useContext } from "react";
import { iStateTodoItem, storeActions } from "./todoStore";
import { StateContext } from "./Todo";
import {
  TodoItemContainer,
  TodoItemName,
  TodoItemActions,
  TodoItemDelete,
} from "./TodoItem.styled";

const HIGHLIGHT_TIME = 2000;
export interface iTodoItemProps {
  todo: iStateTodoItem;
  listId: number;
}
export const TodoItem = ({ todo, listId }: iTodoItemProps) => {
  const { dispatch } = useContext(StateContext);
  const onChangeCompleteStatus = () => {
    dispatch?.({
      type: storeActions.todoUpdate,
      payload: {
        listId: listId,
        id: todo.id,
        isDone: !todo.isDone,
      },
    });
  };
  const onClickDeleteItem = () => {
    dispatch?.({
      type: storeActions.todoDelete,
      payload: {
        listId: listId,
        id: todo.id,
      },
    });
  };

  // Highlight on add
  const refTodoItemContainer = useRef<HTMLLIElement>(null);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    // NOTE: `todo.id` is a timestamp
    const highlightUntil = todo.id + HIGHLIGHT_TIME;
    if (refTodoItemContainer?.current && Date.now() < highlightUntil) {
      const highlightTimeout = highlightUntil - Date.now();

      refTodoItemContainer.current.classList.add("highlight");

      timeoutId = setTimeout(() => {
        if (refTodoItemContainer?.current) {
          refTodoItemContainer.current.classList.remove("highlight");
        }
      }, highlightTimeout);
    }
    // cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [refTodoItemContainer, todo.id]);

  const onBlurTodoItemName = ({
    target,
    text,
  }: {
    target: EventTarget & HTMLInputElement;
    text: string;
  }) => {
    const textCurrent = target.value;
    if (textCurrent !== text) {
      target.value = text;
    }
  };
  const onKeyDownTodoItemName = ({
    code,
    currentTarget,
    text,
    id,
  }: {
    code: string;
    currentTarget: EventTarget & HTMLInputElement;
    text: string;
    id: number;
  }) => {
    const textCurrent = currentTarget.value;
    if (code === "Enter" || code === "NumpadEnter") {
      if (textCurrent !== "" && textCurrent !== text) {
        dispatch?.({
          type: storeActions.todoUpdate,
          payload: {
            listId: listId,
            id,
            text: textCurrent,
          },
        });
        setTimeout(() => {
          currentTarget.blur();
        }, 0);
      }
    }
    if (code === "Escape") {
      if (textCurrent !== text) {
        currentTarget.value = text;
      }
    }
  };
  const onChangeCheckboxMultiSelect = (isChecked: boolean) => {
    // onClickMultiSelectItem({ id, isChecked });
  };

  var itemClass = `form-check todoitem ${todo.isDone ? "done" : "undone"}`;
  return (
    <TodoItemContainer className={itemClass} ref={refTodoItemContainer}>
      <input
        name="multiselect"
        type="checkbox"
        aria-label={`Add todo to bulk editing`}
        onChange={(e) => {
          onChangeCheckboxMultiSelect(e.target.checked);
        }}
      />

      <input
        type="checkbox"
        className="form-check-input"
        onChange={onChangeCompleteStatus}
        defaultChecked={todo.isDone}
      />

      <TodoItemName
        contentEditable="false"
        onBlur={({ target }) => {
          onBlurTodoItemName({ target, text: todo.text });
        }}
        onKeyDown={({ code, currentTarget }) => {
          onKeyDownTodoItemName({
            code,
            currentTarget,
            text: todo.text,
            id: todo.id,
          });
        }}
        defaultValue={todo.text}
        disabled={todo.isDone}
      />
      <TodoItemActions>
        <TodoItemDelete onClick={onClickDeleteItem}>Delete</TodoItemDelete>
      </TodoItemActions>
    </TodoItemContainer>
  );
};
