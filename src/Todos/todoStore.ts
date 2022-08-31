export interface iStateListItem {
  id: number;
  text: string;
  order: number;
  todos: iStateTodo[];
  todoMultiselect: number[];
}
export interface iStateTodo {
  id: number;
  text: string;
  order: number;
  isDone: boolean;
}
export interface iState {
  lists: iStateListItem[];
  listActive?: number;
  listMultiselect?: number[];
}
export interface iStateAction {
  type: storeActions;
  payload?: any;
}

export enum storeActions {
  "listActive" = "listActive",
  "listCreate" = "listCreate",
  "listDelete" = "listDelete",
  "listToggleMultiSelect" = "listToggleMultiSelect",
  "listToggleMultiSelectAll" = "listToggleMultiSelectAll",
  "listUpdate" = "listUpdate",
  "todoCreate" = "todoCreate",
  "todoDelete" = "todoDelete",
  "todoUpdate" = "todoUpdate",
}

export const LOCALSTORAGE = "oakenfold.app:todos";
const localstorageData = localStorage.getItem(LOCALSTORAGE);
let storeLocalStorage;
if (localstorageData) {
  storeLocalStorage = JSON.parse(localstorageData) as iState;
}
export const storeDefault = {
  lists: [],
  listActive: 0,
  listMultiselect: [],
} as iState;
export const storeState = storeLocalStorage || storeDefault;

export const storeReducer = (state: iState, action: iStateAction) => {
  switch (action.type) {
    // ------------------
    // Lists
    // ------------------
    case storeActions.listCreate: {
      const lists = state.lists;
      const listId = Date.now();
      const listsFiltered = lists.filter(({ id }) => {
        return id !== listId;
      });
      return {
        ...state,
        lists: [
          ...listsFiltered,
          {
            id: listId,
            text: action.payload.text || `list ${listId}`,
            todos: [],
            todoMultiselect: [],
            order: listsFiltered.length,
          },
        ],
        listActive: listId,
      };
    }
    case storeActions.listUpdate: {
      const lists = [...state.lists];
      const listId = action.payload.id;

      if (action.payload.text === "") {
        action.payload.text = `(list ${listId})`;
      }
      const indexListToEdit = lists.findIndex(({ id }) => id === listId);
      lists[indexListToEdit] = {
        ...lists[indexListToEdit],
        ...action.payload,
      };
      lists.sort((first, second) => {
        return first.order - second.order;
      });
      return {
        ...state,
        lists,
      };
    }
    case storeActions.listDelete: {
      const lists = [...state.lists];
      const listId = action.payload.id;
      const listActive = state.listActive === listId ? 0 : state.listActive;

      // remove from multiselect
      const listMultiselectCurrent = state?.listMultiselect || [];

      return {
        ...state,
        listActive,
        lists: lists
          .filter(({ id }) => id !== listId)
          .sort((first, second) => {
            return first.order - second.order;
          }),
        listMultiselect: listMultiselectCurrent.filter((id) => id !== listId),
      };
    }
    case storeActions.listActive: {
      return {
        ...state,
        listActive: action.payload.id,
      };
    }
    case storeActions.listToggleMultiSelect: {
      const listId = action.payload.id;
      const listMultiselectCurrent = state?.listMultiselect || [];
      const listMultiselect = listMultiselectCurrent.includes(listId)
        ? listMultiselectCurrent.filter((id) => id !== listId)
        : [...listMultiselectCurrent, listId];
      return {
        ...state,
        listMultiselect,
      };
    }
    case storeActions.listToggleMultiSelectAll: {
      const listMultiselectCount = (state?.listMultiselect || []).length;
      const listMultiselect =
        listMultiselectCount === state.lists.length
          ? []
          : state.lists.map(({ id }) => id);
      return {
        ...state,
        listMultiselect,
      };
    }
    // ------------------
    // Todos
    // ------------------
    case storeActions.todoCreate: {
      const lists = [...state.lists];
      const listId = action.payload.listId;
      const indexListToEdit = lists.findIndex(({ id }) => id === listId);
      const listToEdit = lists[indexListToEdit];
      const todosFiltered = listToEdit.todos.filter(({ id }) => {
        return id !== action.payload.id;
      });
      listToEdit.todos = [
        ...todosFiltered,
        {
          ...action.payload,
          order: listToEdit.todos.length + 1,
        },
      ];
      return { ...state, lists };
    }
    case storeActions.todoUpdate: {
      const lists = [...state.lists];
      const listId = action.payload.listId;
      const indexListToEdit = lists.findIndex(({ id }) => id === listId);
      const listToEdit = lists[indexListToEdit];

      const todoId = action.payload.id;
      const todos = [...listToEdit.todos];
      const indexTodoToEdit = todos.findIndex(({ id }) => id === todoId);
      const todoToEdit = todos[indexTodoToEdit];
      const todosFiltered = listToEdit.todos.filter(({ id }) => {
        return id !== todoId;
      });
      const todoEdited = {
        ...todoToEdit,
        ...action.payload,
      };
      listToEdit.todos = [...todosFiltered, todoEdited].sort(
        (first, second) => {
          return first.order - second.order;
        }
      );
      return { ...state, lists };
    }
    case storeActions.todoDelete: {
      const lists = [...state.lists];

      const listId = action.payload.listId;
      const indexListToEdit = lists.findIndex(({ id }) => id === listId);
      const listToEdit = lists[indexListToEdit];

      const todoId = action.payload.id;
      const todosFiltered = listToEdit.todos
        .filter(({ id }) => {
          return id !== todoId;
        })
        .sort((first, second) => {
          return first.order - second.order;
        });
      listToEdit.todos = todosFiltered;

      return { ...state, lists };
    }
    // ------------------
    // Default
    // ------------------
    default:
      console.warn("Unhandled action.type", action);
      return state;
  }
};
