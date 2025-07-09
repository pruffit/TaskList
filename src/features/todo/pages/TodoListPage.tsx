import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import useTodoStore from '../hooks/useTodoStore';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoStats from '../components/TodoStats';

const TodoListPage = () => {
  const { filteredTodos, filter, setFilter, addTodo, toggleTodo, clearCompleted, activeCount } =
    useTodoStore();

  return (
    <Card className="w-full max-w-md dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="dark:text-white">Tasks List</CardTitle>
      </CardHeader>
      <CardContent>
        <TodoForm onSubmit={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} />
        <TodoStats
          activeCount={activeCount}
          filter={filter}
          setFilter={setFilter}
          onClearCompleted={clearCompleted}
        />
      </CardContent>
    </Card>
  );
};

export default TodoListPage;
