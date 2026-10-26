"use client";
import { useAppState } from "@/providers/app-provider";
import { Todo } from "@/types/types";
import { useState } from "react";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { dispatch } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const saveEdit = () => {
    const text = editText.trim();

    if (text && text !== todo.text) {
      dispatch({
        type: "EDIT_TODO",
        payload: { id: todo.id, text },
      });
    }

    setEditText(text || todo.text);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

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
        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            className="min-w-0 flex-1 rounded border border-[#E5E5E5] bg-white px-2 py-1 text-[#525252] outline-none focus:border-neutral-400"
          />
        ) : (
          <p
            className={
              "color: #525252" + (todo.completed ? " line-through" : "")
            }
            onDoubleClick={() => {
              setEditText(todo.text);
              setIsEditing(true);
            }}
          >
            {todo.text}
          </p>
        )}
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
