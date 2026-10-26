"use client";
import { useAppState } from "@/providers/app-provider";
import { ReactNode } from "react";
import TodoItem from "./TodoItem";

const TodoListState = ({ state }: { state: "loading" | "empty" }) => {
  let text = "???";
  switch (state) {
    case "loading":
      text = "Завантаження...";
      break;
    case "empty":
      text = "Наразі завдань ще немає.";
      break;
  }

  return (
    <Container>
      <p className="mt-2 text-center text-[#4f4f4f]">{text}</p>
    </Container>
  );
};

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full py-5 flex flex-col gap-3 max-h-100 overflow-y-auto">
      {children}
    </div>
  );
};

export default function TodoList() {
  const { state, dispatch } = useAppState();

  if (!state.isLoaded) {
    return <TodoListState state="loading" />;
  }

  const todos = state.todos.filter((todo) => {
    if (state.filterBy == "COMPLETED") return todo.completed;
    if (state.filterBy == "NOT_COMPLETED") return !todo.completed;
    return true;
  });

  if (todos.length === 0) {
    return <TodoListState state="empty" />;
  }

  return (
    <Container>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Container>
  );
}
