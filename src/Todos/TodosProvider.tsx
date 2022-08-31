import { useEffect, useReducer, createContext } from "react";
import {
  storeReducer,
  storeState,
  LOCALSTORAGE,
  iState,
  iStateAction,
} from "./todoStore";

export interface iStateContext {
  state: iState;
  dispatch?: React.Dispatch<iStateAction>;
}
export const StateContext = createContext<iStateContext>({
  state: storeState,
});
export const TodosProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(storeReducer, storeState);
  useEffect(() => {
    console.log("todosprovider updating localstorage");
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(state));
    return () => {};
  }, [state]);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
