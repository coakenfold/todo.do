import { useEffect, useState, useReducer, createContext } from "react";
import {
  storeReducer,
  storeState,
  storeActions,
  LOCALSTORAGE,
  iState,
  iStateAction,
} from "./todoStore";
import {
  List,
  ListBulkSelect,
  ListCreateButton,
  ListCreateContainer,
  ListCreateInput,
  ListActions,
  ListDelete,
  ListDetails,
  ListName,
  ListsContainer,
  Lists,
  ListsNoLists,
  ListsTitle,
  TodoRoot,
  TodoTitle,
} from "./Todo.styled";
import { TodoList } from "./TodoList";

export interface iStateContext {
  state: iState;
  dispatch: undefined | React.Dispatch<iStateAction>;
}
export const StateContext = createContext<iStateContext>({
  state: storeState,
  dispatch: undefined,
});

export const Todo = () => {
  const [state, dispatch] = useReducer(storeReducer, storeState);
  const [listCreateText, setListCreateText] = useState("");
  const [listSelectedId, setListSelectedId] = useState<number>();

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
  const onClickListView = (id: number) => {
    setListSelectedId(id);
  };

  const selectedListData = state.lists.filter(({ id }) => {
    return id === listSelectedId;
  })[0];
  return (
    <TodoRoot>
      <StateContext.Provider value={{ state, dispatch }}>
        <TodoTitle>Todo.Do</TodoTitle>

        <ListCreateContainer>
          <ListCreateInput
            type="text"
            placeholder="New list name"
            onChange={(event) => {
              onChangeListText(event.target.value);
            }}
            value={listCreateText}
          />
          <ListCreateButton onClick={onClickCreateList}>
            Create List
          </ListCreateButton>
        </ListCreateContainer>

        <ListsContainer>
          <ListsTitle>Todo.Lists</ListsTitle>
          {state.lists.length === 0 ? (
            <ListsNoLists>No lists</ListsNoLists>
          ) : (
            <Lists>
              {state.lists.map(({ id, text, todos }) => {
                return (
                  <List key={id}>
                    <ListBulkSelect type="checkbox" />
                    <ListName
                      contentEditable="false"
                      onBlur={({ target }) => {
                        onBlurListName({ target, text });
                      }}
                      onKeyDown={({ code, currentTarget }) => {
                        onKeyDownListName({ code, currentTarget, text, id });
                      }}
                      defaultValue={text}
                    />
                    <ListActions>
                      <ListDetails
                        onClick={() => {
                          onClickListView(id);
                        }}
                      >
                        View
                      </ListDetails>
                      <ListDelete
                        onClick={() => {
                          onClickListDelete(id);
                        }}
                      >
                        Delete
                      </ListDelete>
                    </ListActions>
                  </List>
                );
              })}
            </Lists>
          )}
        </ListsContainer>
        {selectedListData ? <TodoList list={selectedListData} /> : <></>}
      </StateContext.Provider>
    </TodoRoot>
  );
};
