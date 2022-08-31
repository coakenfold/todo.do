import { useState, useContext } from "react";
import { storeActions } from "./todoStore";
import { StateContext } from "./TodosProvider";
import {
  TodoListsListItem,
  TodoListsListActionsGroup,
  TodoListsListCollection,
  TodoListsListCollectionEmpty,
  TodoListsListGroup,
  TodoListsHeadingGroup,
  TodoListsTitle,
  TodoListsListDeleteButton,
  TodoListsListDetailsButton,
  TodoListsListMultiSelectButton,
  TodoListsListName,
  TodoListsMultiselectActionGroup,
  TodoListsMultiselectSelectAllButton,
  TodoListsNewListButton,
  TodoListsNewListGroup,
  TodoListsNewListInput,
  TodoListsMultiselectDeleteButton,
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
  const onClickToggleMultiSelect = (id: number) => {
    dispatch?.({
      type: storeActions.listToggleMultiSelect,
      payload: { id },
    });
  };
  const onClickToggleMultiSelectAll = () => {
    dispatch?.({
      type: storeActions.listToggleMultiSelectAll,
    });
  };

  const onClickToggleMultiSelectDelete = () => {
    const multiSelectItems = state.listMultiselect || [];
    multiSelectItems.forEach((idMultiSelect) => {
      onClickListDelete(idMultiSelect);
    });
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
        <TodoListsNewListButton
          onClick={(e) => {
            e.preventDefault();
            onClickCreateList();
          }}
        >
          Create List
        </TodoListsNewListButton>
      </TodoListsNewListGroup>

      <TodoListsListGroup>
        <TodoListsHeadingGroup>
          <TodoListsTitle>Todo.Lists</TodoListsTitle>

          <TodoListsMultiselectActionGroup>
            {state.listMultiselect && state.listMultiselect.length > 1 ? (
              <TodoListsMultiselectDeleteButton
                onClick={() => {
                  onClickToggleMultiSelectDelete();
                }}
              >
                Delete selected{" "}
                {state.listMultiselect.length > 1 ? "lists" : "list"}
              </TodoListsMultiselectDeleteButton>
            ) : (
              <></>
            )}
            {state.lists.length > 1 ? (
              <TodoListsMultiselectSelectAllButton
                onClick={onClickToggleMultiSelectAll}
              >
                {state.listMultiselect?.length === state.lists.length
                  ? `Deselect all lists`
                  : `Select all lists`}
              </TodoListsMultiselectSelectAllButton>
            ) : (
              <></>
            )}
          </TodoListsMultiselectActionGroup>
        </TodoListsHeadingGroup>

        {state.lists.length === 0 ? (
          <TodoListsListCollectionEmpty>No lists</TodoListsListCollectionEmpty>
        ) : (
          <TodoListsListCollection>
            {state.lists.map(({ id, text }) => {
              return (
                <TodoListsListItem key={id}>
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
                      onClick={() => {
                        onClickToggleMultiSelect(id);
                      }}
                      className={
                        state.listMultiselect?.includes(id) ? "selected" : ""
                      }
                    >
                      {state.listMultiselect?.includes(id)
                        ? "Selected"
                        : "Select"}
                    </TodoListsListMultiSelectButton>
                    <TodoListsListDeleteButton
                      onClick={() => {
                        onClickListDelete(id);
                      }}
                    >
                      Delete
                    </TodoListsListDeleteButton>
                  </TodoListsListActionsGroup>
                </TodoListsListItem>
              );
            })}
          </TodoListsListCollection>
        )}
      </TodoListsListGroup>
    </>
  );
};
