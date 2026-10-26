import TodoCounter from "@/components/TodoCounter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="content my-4 w-full max-w-[520px] flex-1 bg-white px-4 py-6 shadow-sm sm:my-8 sm:rounded-xl sm:px-8 sm:py-10">
      <h1 className="text-2xl font-semibold sm:text-3xl">Список завдань</h1>

      <div className="my-4 h-px w-full bg-gray-200" />

      <TodoForm />
      <TodoList />

      <div className="mb-3 mt-4 h-px w-full bg-gray-200" />

      <TodoCounter />
    </div>
  );
}
