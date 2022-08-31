import { useState, useContext } from "react";
import { storeActions } from "./todoStore";
import { StateContext } from "./TodosProvider";
import {
  TodoListsList,
  TodoListsListActionsGroup,
  TodoListsListMultiSelectButton,
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

export const TodoLists = () => {
  const { state, dispatch } = useContext(StateContext);
  const [listCreateText, setListCreateText] = useState("");

  const onChangeListText = (value: string) => {
    setListCreateText(value);
  };
  const onClickCreateList = () => {
    dispatch?.({
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
        dispatch?.({
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
    dispatch?.({
      type: storeActions.listDelete,
      payload: { id },
    });
  };
  const _onClickListView = (id: number) => {
    dispatch?.({
      type: storeActions.listActive,
      payload: { id },
    });
  };
  const onClickToggleMultiSelect = () => {};

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
        <TodoListsNewListButton
          onClick={(e) => {
            e.preventDefault();
            onClickCreateList();
          }}
        >
          Create List
        </TodoListsNewListButton>
      </TodoListsNewListGroup>

      <TodoListsListCollectionGroup>
        <TodoListsListCollectionTitle>Todo.Lists</TodoListsListCollectionTitle>
        {state.lists.length === 0 ? (
          <TodoListsListCollectionEmpty>No lists</TodoListsListCollectionEmpty>
        ) : (
          <TodoListsListCollection>
            {state.lists.map(({ id, text }) => {
              return (
                <TodoListsList key={id}>
                  <TodoListsListActionsGroup>
                    <TodoListsListDetailsButton
                      className={id === state.listActive ? "active" : ""}
                      onClick={() => {
                        _onClickListView(id);
                      }}
                    >
                      {id === state.listActive ? "Viewing" : "View"}
                    </TodoListsListDetailsButton>
                  </TodoListsListActionsGroup>
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
                    <TodoListsListMultiSelectButton
                      onClick={onClickToggleMultiSelect}
                    >
                      Select
                    </TodoListsListMultiSelectButton>
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
