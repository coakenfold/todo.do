import { useEffect, useRef, useContext } from "react";
import { iStateTodo, storeActions } from "./todoStore";
import { StateContext } from "./TodosProvider";
import {
  TodoItem,
  TodoForm,
  TodoName,
  TodoActionsGroup,
  TodoCheckboxGroup,
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
  const refTodoForm = useRef<HTMLFormElement>(null);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    // NOTE: `todo.id` is a timestamp
    const highlightUntil = todo.id + HIGHLIGHT_TIME;
    if (refTodoForm?.current && Date.now() < highlightUntil) {
      const highlightTimeout = highlightUntil - Date.now();

      refTodoForm.current.classList.add("highlight");

      timeoutId = setTimeout(() => {
        if (refTodoForm?.current) {
          refTodoForm.current.classList.remove("highlight");
        }
      }, highlightTimeout);
    }
    // cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [refTodoForm, todo.id]);

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
    <TodoItem>
      <TodoForm
        className={todo.isDone ? "done" : "undone"}
        ref={refTodoForm}
        onSubmit={(event) => {
          event?.preventDefault();
        }}
      >
        <label htmlFor={`todo${todo.id}.isDone`} className="sr-only">
          Finish Todo #{todo.id}
        </label>
        <TodoCheckboxGroup>
          <input
            type="checkbox"
            onChange={onChangeCompleteStatus}
            checked={todo.isDone}
            id={`todo${todo.id}.isDone`}
          />
        </TodoCheckboxGroup>
        <label htmlFor={`todo${todo.id}`} className="sr-only">
          Edit Todo #{todo.id}
        </label>
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
          id={`todo${todo.id}`}
        />
        <TodoActionsGroup>
          <TodoMultiselectButton
            type="button"
            onClick={onClickToggleMultiselect}
            className={isSelected ? "selected" : ""}
          >
            {isSelected ? "Deselect" : "Select"}
          </TodoMultiselectButton>
          <TodoDeleteButton type="button" onClick={onClickDeleteItem}>
            Delete
          </TodoDeleteButton>
        </TodoActionsGroup>
      </TodoForm>
    </TodoItem>
  );
};
