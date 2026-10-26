"use client";

import { useAppState } from "@/providers/app-provider";

const filters = [
  { value: "ALL", label: "Усі" },
  { value: "COMPLETED", label: "Виконані" },
  { value: "NOT_COMPLETED", label: "Не виконані" },
] as const;

export default function TodosFilter() {
  const { state, dispatch } = useAppState();

  return (
    <div className="flex w-full gap-2 mt-3">
      {filters.map((filter) => {
        const isActive = state.filterBy === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() =>
              dispatch({
                type: "CHANGE_FILTER",
                payload: filter.value,
              })
            }
            className={`flex-1 rounded-xl px-2 py-2 text-sm transition-all duration-200 ${
              isActive
                ? "bg-neutral-700 text-white"
                : "bg-[#F5F5F5] text-[#525252] hover:bg-[#EEEEEE]"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
