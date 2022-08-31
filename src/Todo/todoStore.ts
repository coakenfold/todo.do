export interface iStateListItem {
  id: number;
  text: string;
  order: number;
  todos: iStateTodoItem[];
  multiselect: number[];
}
export interface iStateTodoItem {
  id: number;
  text: string;
  order: number;
  isDone: boolean;
}
export interface iState {
  lists: iStateListItem[];
}
export interface iStateAction {
  type: storeActions;
  payload?: any;
}

export enum storeActions {
  "todoCreate" = "todoCreate",
  "todoUpdate" = "todoUpdate",
  "todoDelete" = "todoDelete",
  "listUpdate" = "listUpdate",
  "listCreate" = "listCreate",
  "listDelete" = "listDelete",
}
/*
lists: [{
  id: 1,
  text: 'list 1',
  todos: [
    {id: 1, text: 'item 1', isDone: true},
  ]
  multiselect: [2,3]
}]
*/
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
            multiselect: [],
            order: listsFiltered.length,
          },
        ],
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
      return {
        ...state,
        lists: lists
          .filter(({ id }) => id !== listId)
          .sort((first, second) => {
            return first.order - second.order;
          }),
      };
    }
    // ------------------
    // Todos
    // ------------------
    // case storeActions.todoCreate: {
    //   const lists = [...state.lists];
    //   const listId = action.payload.listId;
    //   const indexListToEdit = lists.findIndex(({ id }) => id === listId);
    //   const listToEdit = lists[indexListToEdit];
    //   const todosFiltered = listToEdit.todos.filter(({ id }) => {
    //     return id !== action.payload.id;
    //   });
    //   listToEdit.todos = [...todosFiltered, action.payload];
    //   return { lists };
    // }
    case storeActions.todoCreate: {
      console.log("todoCreate!");
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
      return { lists };
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
          console.log(first, second);
          return first.order - second.order;
        }
      );
      return { lists };
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

      return { lists };
    }
    // ------------------
    // Default
    // ------------------
    default:
      console.warn("Unhandled action.type", action);
      return state;
  }
};

export const LOCALSTORAGE = "oakenfold.app:todos";
const localstorageData = localStorage.getItem(LOCALSTORAGE);
let storeLocalStorage;
if (localstorageData) {
  storeLocalStorage = JSON.parse(localstorageData);
}

export const storeDefault = { lists: [] };
export const storeState: iState = storeLocalStorage || storeDefault;
