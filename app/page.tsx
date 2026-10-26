/*
На головній сторінці створіть:
Заголовок "Список завдань"
Форму з одним полем введення та кнопкою "Додати"
Список завдань, де кожен елемент містить:
Чекбокс
Текст завдання
Кнопку видалення (іконка "×" або "Видалити")
Блок з текстом "Залишилось виконати: X", де X — кількість невиконаних завдань
*/

import TodoCounter from "@/components/TodoCounter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="content px-8 py-10 w-full max-w-130">
      <h1 className="text-3xl font-semibold">Список завдань</h1>

      <div className="w-full h-px bg-gray-400 my-4" />

      <TodoForm />
      <TodoList />

      <div className="w-full h-px bg-gray-400 mb-3 mt-1" />

      <TodoCounter />
    </div>
  );
}
