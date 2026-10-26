import { Todo } from "@/types/types";

export type AppState = {
  todos: Todo[];
  isLoaded: boolean;
  filterBy: "ALL" | "COMPLETED" | "NOT_COMPLETED";
};

export type AppAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "EDIT_TODO"; payload: { id: string; text: string } }
  | { type: "REMOVE_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "CHANGE_FILTER"; payload: AppState["filterBy"] };

export const initialState: AppState = {
  todos: [],
  isLoaded: false,
  filterBy: "ALL",
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "SET_TODOS":
      return { ...state, todos: [...action.payload], isLoaded: true };
    case "CHANGE_FILTER":
      return { ...state, filterBy: action.payload };
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
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo,
        ),
      };
    default:
      return state;
  }
}
