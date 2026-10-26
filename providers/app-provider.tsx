"use client";

import {
  appReducer,
  initialState,
  type AppAction,
  type AppState,
} from "@/states/app-state";
import { Todo } from "@/types/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

type AppContextValue = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("todos");

      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);

        const todos = parsedTodos.map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));

        dispatch({ type: "SET_TODOS", payload: todos });
      } else {
        dispatch({ type: "SET_TODOS", payload: [] });
      }
    } catch (error) {
      alert("Не вдалося завантажити завдання:" + error);
      dispatch({ type: "SET_TODOS", payload: [] });
    }
  }, [dispatch]);

  useEffect(() => {
    if (!state.isLoaded) return;

    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos, state.isLoaded]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used with AppProvider");
  return ctx;
}
