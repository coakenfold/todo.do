import { useEffect, useRef, useContext } from "react";
import { iStateTodo, storeActions } from "./todoStore";
import { StateContext } from "./Todos";
import { TodoGroup, TodoName, TodoActions, TodoDelete } from "./Todo.styled";

const HIGHLIGHT_TIME = 2000;
export interface iTodoProps {
  todo: iStateTodo;
  listId: number;
}
export const Todo = ({ todo, listId }: iTodoProps) => {
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
  const refTodoGroup = useRef<HTMLLIElement>(null);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    // NOTE: `todo.id` is a timestamp
    const highlightUntil = todo.id + HIGHLIGHT_TIME;
    if (refTodoGroup?.current && Date.now() < highlightUntil) {
      const highlightTimeout = highlightUntil - Date.now();

      refTodoGroup.current.classList.add("highlight");

      timeoutId = setTimeout(() => {
        if (refTodoGroup?.current) {
          refTodoGroup.current.classList.remove("highlight");
        }
      }, highlightTimeout);
    }
    // cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [refTodoGroup, todo.id]);

  const onBlurTodoName = ({
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
  const onKeyDownTodoName = ({
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
    <TodoGroup className={itemClass} ref={refTodoGroup}>
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

      <TodoName
        contentEditable="false"
        onBlur={({ target }) => {
          onBlurTodoName({ target, text: todo.text });
        }}
        onKeyDown={({ code, currentTarget }) => {
          onKeyDownTodoName({
            code,
            currentTarget,
            text: todo.text,
            id: todo.id,
          });
        }}
        defaultValue={todo.text}
        disabled={todo.isDone}
      />
      <TodoActions>
        <TodoDelete onClick={onClickDeleteItem}>Delete</TodoDelete>
      </TodoActions>
    </TodoGroup>
  );
};
