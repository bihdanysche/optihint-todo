"use client";

import { useAppState } from "@/providers/app-provider";
import { useMemo } from "react";

export default function TodoCounter() {
  const { state } = useAppState();

  const counter = useMemo(
    () => state.todos.filter((todo) => !todo.completed).length,
    [state.todos],
  );

  return (
    <div className="mb-4 rounded-lg border border-[#E5E5E5] bg-[#F5F5F5] px-4 py-3">
      <p className="text-sm text-neutral-500">
        Залишилось завдань:{" "}
        <b className="font-semibold text-neutral-700">{counter}</b>
      </p>
    </div>
  );
}
