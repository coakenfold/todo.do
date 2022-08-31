import { useEffect, useState, useReducer } from "react";
import {
  storeReducer,
  storeState,
  storeActions,
  LOCALSTORAGE,
} from "./todoStore";
import {
  TodoListsList,
  TodoListsListActionsGroup,
  TodoListsListBulkEditSelect,
  TodoListsListCollection,
  TodoListsListCollectionEmpty,
  TodoListsListCollectionGroup,
  TodoListsListCollectionTitle,
  TodoListsListDeleteButton,
  TodoListsListDetailsButton,
  TodoListsListName,
  TodoListsNewListButton,
  TodoListsNewListGroup,
  TodoListsNewListInput,
} from "./TodoLists.styled";

export const TodoLists = ({
  onClickListView,
}: {
  onClickListView: (id: number) => void;
}) => {
  const [state, dispatch] = useReducer(storeReducer, storeState);
  const [listCreateText, setListCreateText] = useState("");

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(state));
    return () => {};
  }, [state]);

  const onChangeListText = (value: string) => {
    setListCreateText(value);
  };
  const onClickCreateList = () => {
    dispatch({
      type: storeActions.listCreate,
      payload: { text: listCreateText },
    });
  };
  const onBlurListName = ({
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
  const onKeyDownListName = ({
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
        dispatch({
          type: storeActions.listUpdate,
          payload: { text: textCurrent, id },
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
  const onClickListDelete = (id: number) => {
    dispatch({
      type: storeActions.listDelete,
      payload: { id },
    });
  };
  const _onClickListView = (id: number) => {
    onClickListView(id);
  };

  return (
    <>
      <TodoListsNewListGroup>
        <TodoListsNewListInput
          type="text"
          placeholder="New list name"
          onChange={(event) => {
            onChangeListText(event.target.value);
          }}
          value={listCreateText}
        />
        <TodoListsNewListButton onClick={onClickCreateList}>
          Create List
        </TodoListsNewListButton>
      </TodoListsNewListGroup>

      <TodoListsListCollectionGroup>
        <TodoListsListCollectionTitle>Todo.Lists</TodoListsListCollectionTitle>
        {state.lists.length === 0 ? (
          <TodoListsListCollectionEmpty>No lists</TodoListsListCollectionEmpty>
        ) : (
          <TodoListsListCollection>
            {state.lists.map(({ id, text, todos }) => {
              return (
                <TodoListsList key={id}>
                  <TodoListsListBulkEditSelect type="checkbox" />
                  <TodoListsListName
                    contentEditable="false"
                    onBlur={({ target }) => {
                      onBlurListName({ target, text });
                    }}
                    onKeyDown={({ code, currentTarget }) => {
                      onKeyDownListName({ code, currentTarget, text, id });
                    }}
                    defaultValue={text}
                  />
                  <TodoListsListActionsGroup>
                    <TodoListsListDetailsButton
                      onClick={() => {
                        _onClickListView(id);
                      }}
                    >
                      View
                    </TodoListsListDetailsButton>
                    <TodoListsListDeleteButton
                      onClick={() => {
                        onClickListDelete(id);
                      }}
                    >
                      Delete
                    </TodoListsListDeleteButton>
                  </TodoListsListActionsGroup>
                </TodoListsList>
              );
            })}
          </TodoListsListCollection>
        )}
      </TodoListsListCollectionGroup>
    </>
  );
};
