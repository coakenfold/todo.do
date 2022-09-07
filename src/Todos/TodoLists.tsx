import { useState, useContext } from "react";
import { storeActions } from "./todoStore";
import { StateContext } from "./TodosProvider";
import {
  TodoListsHeaderGroup,
  TodoListsListActionsGroup,
  TodoListsListCollection,
  TodoListsListDeleteButton,
  TodoListsListDetailsButton,
  TodoListsListGroup,
  TodoListsListItem,
  TodoListsListItemForm,
  TodoListsListMultiselectButton,
  TodoListsListName,
  TodoListsMultiselectActionGroup,
  TodoListsMultiselectDeleteButton,
  TodoListsMultiselectSelectAllButton,
  TodoListsNewListButton,
  TodoListsNewListForm,
  TodoListsNewListInput,
  TodoListsTitle,
} from "./TodoLists.styled";

export const TodoLists = () => {
  const { state, dispatch } = useContext(StateContext);
  const [textList, setTextList] = useState("");

  const onChangeListText = (value: string) => {
    setTextList(value);
  };
  const onClickCreateList = () => {
    dispatch?.({
      type: storeActions.listCreate,
      payload: { text: textList },
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
      type: storeActions.activeList,
      payload: { id },
    });
  };
  const onClickToggleMultiselect = (id: number) => {
    dispatch?.({
      type: storeActions.listToggleMultiselect,
      payload: { id },
    });
  };
  const onClickToggleMultiselectAll = () => {
    dispatch?.({
      type: storeActions.listToggleMultiselectAll,
    });
  };

  const onClickToggleMultiselectDelete = () => {
    const multiselectItems = state.multiselectLists || [];
    multiselectItems.forEach((idMultiselect) => {
      onClickListDelete(idMultiselect);
    });
  };

  return (
    <>
      <TodoListsNewListForm
        onSubmit={(event) => {
          event?.preventDefault();
        }}
      >
        <label htmlFor="NewListInput" className="sr-only">
          New Todo List name
        </label>
        <TodoListsNewListInput
          placeholder="New Todo List name"
          type="text"
          onChange={(event) => {
            onChangeListText(event.target.value);
          }}
          value={textList}
          id="NewListInput"
        />
        <TodoListsNewListButton
          onClick={(e) => {
            e.preventDefault();
            onClickCreateList();
          }}
          disabled={textList === ""}
        >
          Create new Todo List
        </TodoListsNewListButton>
      </TodoListsNewListForm>
      {state.lists.length > 0 ? (
        <TodoListsListGroup>
          <TodoListsHeaderGroup>
            <TodoListsTitle>Todo Lists:</TodoListsTitle>

            <TodoListsMultiselectActionGroup>
              {state.multiselectLists && state.multiselectLists.length > 1 ? (
                <TodoListsMultiselectDeleteButton
                  onClick={() => {
                    onClickToggleMultiselectDelete();
                  }}
                >
                  {state.multiselectLists.length > 1
                    ? "Delete selected Todo Lists"
                    : "Delete selected Todo List"}
                </TodoListsMultiselectDeleteButton>
              ) : (
                <></>
              )}
              {state.lists.length > 1 ? (
                <TodoListsMultiselectSelectAllButton
                  onClick={onClickToggleMultiselectAll}
                >
                  {state.multiselectLists?.length === state.lists.length
                    ? `Deselect all Todo Lists`
                    : `Select all Todo Lists`}
                </TodoListsMultiselectSelectAllButton>
              ) : (
                <></>
              )}
            </TodoListsMultiselectActionGroup>
          </TodoListsHeaderGroup>

          <TodoListsListCollection>
            {state.lists.map(({ id, text }) => {
              return (
                <TodoListsListItem key={id}>
                  <TodoListsListItemForm
                    onSubmit={(event) => {
                      event?.preventDefault();
                    }}
                  >
                    <TodoListsListActionsGroup>
                      <TodoListsListDetailsButton
                        className={id === state.activeList ? "active" : ""}
                        onClick={() => {
                          _onClickListView(id);
                        }}
                        type="button"
                      >
                        {id === state.activeList ? "Viewing" : "View"}
                      </TodoListsListDetailsButton>
                    </TodoListsListActionsGroup>
                    <label htmlFor={`list${id}`} className="sr-only">
                      Edit Todo List #{id}
                    </label>
                    <TodoListsListName
                      contentEditable="false"
                      onBlur={({ target }) => {
                        onBlurListName({ target, text });
                      }}
                      onKeyDown={({ code, currentTarget }) => {
                        onKeyDownListName({ code, currentTarget, text, id });
                      }}
                      id={`list${id}`}
                      defaultValue={text}
                    />

                    <TodoListsListActionsGroup>
                      <TodoListsListMultiselectButton
                        onClick={() => {
                          onClickToggleMultiselect(id);
                        }}
                        className={
                          state.multiselectLists?.includes(id) ? "selected" : ""
                        }
                        type="button"
                      >
                        {state.multiselectLists?.includes(id)
                          ? "Deselect"
                          : "Select"}
                      </TodoListsListMultiselectButton>
                      <TodoListsListDeleteButton
                        onClick={() => {
                          onClickListDelete(id);
                        }}
                        type="button"
                      >
                        Delete
                      </TodoListsListDeleteButton>
                    </TodoListsListActionsGroup>
                  </TodoListsListItemForm>
                </TodoListsListItem>
              );
            })}
          </TodoListsListCollection>
        </TodoListsListGroup>
      ) : (
        <></>
      )}
    </>
  );
};
