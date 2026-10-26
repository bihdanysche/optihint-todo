import { Todo } from "@/types/types";

export type AppState = {
  todos: Todo[];
  isLoaded: boolean;
};

export type AppAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "REMOVE_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string };

export const initialState: AppState = {
  todos: [],
  isLoaded: false,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "SET_TODOS":
      return { ...state, todos: [...action.payload], isLoaded: true };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    default:
      return state;
  }
}
