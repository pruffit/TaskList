import { useParams, Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import useTodoStore from '../hooks/useTodoStore';
import { Todo } from '@/features/todo/types/todo';

const TodoItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { todos, toggleTodo } = useTodoStore();

  const todo = todos.find((t: Todo) => t.id === id);

  if (!todo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <div className="mt-2">
            <span className={'text-gray-500 line-through'}>Task Not Found</span>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">The requested task does not exist</p>
          <Button asChild>
            <Link to="/todo-list">Back to Tasks</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="dark:text-white">Task Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium dark:text-gray-300">Status:</span>
          <span className={todo.completed ? 'text-green-600' : 'text-yellow-600'}>
            {todo.completed ? 'Completed' : 'Active'}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant={todo.completed ? 'outline' : 'default'}
            onClick={() => toggleTodo(todo.id)}
            className="dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {todo.completed ? 'Mark as Active' : 'Mark as Completed'}
          </Button>

          <Button asChild variant="outline" className="dark:border-gray-600 dark:text-gray-300">
            <Link to="/todo-list">Back to List</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItemPage;
