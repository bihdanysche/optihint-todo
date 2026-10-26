"use client";

import { useAppState } from "@/providers/app-provider";
import { Todo } from "@/types/types";
import React, { useState } from "react";

export default function () {
  const { state, dispatch } = useAppState();

  const [todo, setTodo] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = todo.trim();
    if (text.length === 0) {
      alert("Завдання не може бути пустим!");
      return;
    }

    const newItem: Todo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };

    dispatch({ type: "ADD_TODO", payload: newItem });
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-3">
      <input
        type="text"
        name="todo"
        placeholder="Введіть задачу"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-[#E5E5E5] bg-white px-4 py-3 text-[#525252] placeholder:text-neutral-400 outline-none transition-colors duration-200 focus:border-neutral-400 focus:bg-[#FAFAFA]"
      />

      <button
        type="submit"
        className="rounded-lg bg-neutral-700 px-5 py-3 font-medium text-white transition-all duration-200 ease-in-out hover:bg-neutral-800 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 cursor-pointer"
      >
        Додати
      </button>
    </form>
  );
}
