import { useMemo, useState } from 'react';
import useLocalStorage from '@/shared/hooks/useLocalStorage';
import { Todo, TodoFilter } from '@/features/todo/types/todo';

const useTodoStore = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<TodoFilter>('all');

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const getTodoById = (id: string) => {
    return todos.find((todo) => todo.id === id);
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed);
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    clearCompleted,
    getTodoById,
    activeCount: todos.filter((t) => !t.completed).length,
  };
};

export default useTodoStore;
