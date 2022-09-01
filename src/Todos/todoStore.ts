export interface iStateListItem {
  id: number;
  text: string;
  order: number;
  todos: iStateTodo[];
}
export interface iStateTodo {
  id: number;
  text: string;
  order: number;
  isDone: boolean;
}
export interface iState {
  lists: iStateListItem[];
  activeList?: number;
  multiselectLists?: number[];
  multiselectTodos?: number[];
}
export interface iStateAction {
  type: storeActions;
  payload?: any;
}

export enum storeActions {
  // Lists
  "activeList" = "activeList",
  "listCreate" = "listCreate",
  "listDelete" = "listDelete",
  "listToggleMultiselect" = "listToggleMultiselect",
  "listToggleMultiselectAll" = "listToggleMultiselectAll",
  "listUpdate" = "listUpdate",
  // Todos
  "todoCreate" = "todoCreate",
  "todoDelete" = "todoDelete",
  "todoToggleMultiselect" = "todoToggleMultiselect",
  "todoToggleMultiselectAll" = "todoToggleMultiselectAll",
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
  activeList: 0,
  multiselectLists: [],
  multiselectTodos: [],
} as iState;
export const storeState = storeLocalStorage || storeDefault;

const sortOrder = (first: { order: number }, second: { order: number }) => {
  return first.order - second.order;
};
export const storeReducer = (state: iState, action: iStateAction) => {
  switch (action.type) {
    // ------------------
    // Lists
    // ------------------
    // List: Create
    case storeActions.listCreate: {
      const lists = state.lists;
      const idList = Date.now();
      const listsFiltered = lists.filter(({ id }) => {
        return id !== idList;
      });

      return {
        ...state,
        // add to lists
        lists: [
          ...listsFiltered,
          {
            id: idList,
            text: action.payload.text || `list ${idList}`,
            todos: [],
            order: listsFiltered.length,
          },
        ],
        // set as active
        activeList: idList,
        // empty out multiselects
        multiselectLists: [],
        multiselectTodos: [],
      };
    }

    // List: Update
    case storeActions.listUpdate: {
      const lists = [...state.lists];
      const idList = action.payload.id;

      if (action.payload.text === "") {
        action.payload.text = `(list ${idList})`;
      }

      const indexList = lists.findIndex(({ id }) => id === idList);
      lists[indexList] = {
        ...lists[indexList],
        ...action.payload,
      };

      lists.sort(sortOrder);

      return {
        ...state,
        lists,
      };
    }

    // List: Delete
    case storeActions.listDelete: {
      const lists = [...state.lists];
      const idList = action.payload.id;
      const activeList = state.activeList === idList ? 0 : state.activeList;

      // remove from multiselect
      const currentMultiselectLists = state?.multiselectLists || [];

      return {
        ...state,
        activeList,
        lists: lists.filter(({ id }) => id !== idList).sort(sortOrder),
        multiselectLists: currentMultiselectLists.filter((id) => id !== idList),
      };
    }

    // List: Set active
    case storeActions.activeList: {
      return {
        ...state,
        activeList: action.payload.id,
        multiselectTodos: [],
      };
    }

    // List: Toggle a multiselect item
    case storeActions.listToggleMultiselect: {
      const idList = action.payload.id;
      const currentMultiselectLists = state?.multiselectLists || [];

      const multiselectLists = currentMultiselectLists.includes(idList)
        ? currentMultiselectLists.filter((id) => id !== idList)
        : [...currentMultiselectLists, idList];

      return {
        ...state,
        multiselectLists,
      };
    }

    // List: Toggle all multiselect items
    case storeActions.listToggleMultiselectAll: {
      const countMultiselectLists = (state?.multiselectLists || []).length;

      const multiselectLists =
        countMultiselectLists === state.lists.length
          ? []
          : state.lists.map(({ id }) => id);

      return {
        ...state,
        multiselectLists,
      };
    }
    // ------------------
    // Todos
    // ------------------
    // Todo: Create
    case storeActions.todoCreate: {
      const lists = [...state.lists];
      const indexList = lists.findIndex(
        ({ id }) => id === action.payload.idList
      );
      const list = lists[indexList];
      const todosFiltered = list.todos.filter(({ id }) => {
        return id !== action.payload.id;
      });
      list.todos = [
        ...todosFiltered,
        {
          ...action.payload,
          order: list.todos.length + 1,
        },
      ];

      return { ...state, lists };
    }

    // Todo: Update
    case storeActions.todoUpdate: {
      const lists = [...state.lists];
      const idList = action.payload.idList;
      const indexList = lists.findIndex(({ id }) => id === idList);
      const list = lists[indexList];

      const idTodo = action.payload.id;
      const todos = [...list.todos];
      const indexTodo = todos.findIndex(({ id }) => id === idTodo);
      const todo = todos[indexTodo];
      const todosFiltered = list.todos.filter(({ id }) => {
        return id !== idTodo;
      });

      list.todos = [
        ...todosFiltered,
        {
          ...todo,
          ...action.payload,
        },
      ].sort(sortOrder);

      return { ...state, lists };
    }

    // Todo: Delete
    case storeActions.todoDelete: {
      const lists = [...state.lists];

      const idList = action.payload.idList;
      const indexList = lists.findIndex(({ id }) => id === idList);
      const list = lists[indexList];

      const idTodo = action.payload.id;
      const todosFiltered = list.todos
        .filter(({ id }) => {
          return id !== idTodo;
        })
        .sort(sortOrder);
      list.todos = todosFiltered;

      // remove from multiselectLists
      const multiselectTodosCurrent = state.multiselectTodos || [];
      const multiselectTodos = multiselectTodosCurrent.filter(
        (id) => id !== idTodo
      );

      return { ...state, lists, multiselectTodos };
    }

    // Todo: Toggle a multiselect item
    case storeActions.todoToggleMultiselect: {
      const idList = action.payload.id;
      const currentMultiselectTodos = state?.multiselectTodos || [];
      const multiselectTodos = currentMultiselectTodos.includes(idList)
        ? currentMultiselectTodos.filter((id) => id !== idList)
        : [...currentMultiselectTodos, idList];
      return {
        ...state,
        multiselectTodos,
      };
    }

    // Todo: Toggle all multiselect items
    case storeActions.todoToggleMultiselectAll: {
      const countMultiselectTodos = (state?.multiselectTodos || []).length;

      const indexList = state.lists.findIndex(
        ({ id }) => id === action.payload.idList
      );
      const list = state.lists[indexList];

      const multiselectTodos =
        countMultiselectTodos === list.todos.length
          ? []
          : list.todos.map(({ id }) => id);
      return {
        ...state,
        multiselectTodos,
      };
    }
    // ------------------
    // Default
    // ------------------
    default:
      console.warn("Unhandled action.type", action);
      return state;
  }
};
