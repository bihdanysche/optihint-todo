"use client";
import { useAppState } from "@/providers/app-provider";
import { Todo } from "@/types/types";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { dispatch } = useAppState();
  return (
    <div
      className={
        "flex flex-row transition-colors duration-200 justify-between items-center rounded-xl py-3 px-5 border" +
        (todo.completed
          ? " bg-[#e0e0e0] border-[#d0d0d0] hover:bg-[#F0F0F0]"
          : " bg-[#F5F5F5] border-[#E5E5E5] hover:bg-[#EEEEEE]")
      }
    >
      <div className="flex flex-row gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
        />
        <p
          className={"color: #525252" + (todo.completed ? " line-through" : "")}
        >
          {todo.text}
        </p>
      </div>
      <button
        className="cursor-pointer transition duration-100 text-2xl hover:text-red-500 active:scale-85"
        onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}
      >
        ×
      </button>
    </div>
  );
}
