import { useEffect, useRef, useContext } from "react";
import { iStateTodo, storeActions } from "./todoStore";
import { StateContext } from "./TodosProvider";
import {
  TodoGroup,
  TodoName,
  TodoActionsGroup,
  TodoDeleteButton,
  TodoMultiselectButton,
} from "./Todo.styled";

const HIGHLIGHT_TIME = 2000;
export interface iTodoProps {
  todo: iStateTodo;
  idList: number;
}
export const Todo = ({ todo, idList }: iTodoProps) => {
  const { state, dispatch } = useContext(StateContext);

  // Highlight on todo creation
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

  // Events
  const onChangeCompleteStatus = () => {
    dispatch?.({
      type: storeActions.todoUpdate,
      payload: {
        idList: idList,
        id: todo.id,
        isDone: !todo.isDone,
      },
    });
  };

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
  }: {
    code: string;
    currentTarget: EventTarget & HTMLInputElement;
    text: string;
  }) => {
    const textCurrent = currentTarget.value;
    if (code === "Enter" || code === "NumpadEnter") {
      if (textCurrent !== "" && textCurrent !== text) {
        dispatch?.({
          type: storeActions.todoUpdate,
          payload: {
            idList: idList,
            id: todo.id,
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

  const onClickToggleMultiselect = () => {
    dispatch?.({
      type: storeActions.todoToggleMultiselect,
      payload: { id: todo.id },
    });
  };
  const onClickDeleteItem = () => {
    dispatch?.({
      type: storeActions.todoDelete,
      payload: {
        idList: idList,
        id: todo.id,
      },
    });
  };

  const isSelected = state.multiselectTodos?.includes(todo.id);
  return (
    <TodoGroup className={todo.isDone ? "done" : "undone"} ref={refTodoGroup}>
      <input
        type="checkbox"
        onChange={onChangeCompleteStatus}
        checked={todo.isDone}
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
          });
        }}
        defaultValue={todo.text}
        disabled={todo.isDone}
      />
      <TodoActionsGroup>
        <TodoMultiselectButton
          onClick={onClickToggleMultiselect}
          className={isSelected ? "selected" : ""}
        >
          {isSelected ? "Deselect" : "Select"}
        </TodoMultiselectButton>
        <TodoDeleteButton onClick={onClickDeleteItem}>Delete</TodoDeleteButton>
      </TodoActionsGroup>
    </TodoGroup>
  );
};
