import { useParams, Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import useTodoStore from '../hooks/useTodoStore';
import { Todo } from '@/features/todo/types/todo';

const TodoItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { todos, toggleTodo } = useTodoStore();

  const todo = todos.find((t: Todo) => t.id === id);

  if (!todo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Not Found</CardTitle>
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
    <Card>
      <CardHeader>
        <CardTitle>
          <span className={todo.completed ? 'text-gray-500 line-through' : ''}>{todo.text}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Status:</span>
          <span className={todo.completed ? 'text-green-600' : 'text-yellow-600'}>
            {todo.completed ? 'Completed' : 'Active'}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant={todo.completed ? 'outline' : 'default'}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed ? 'Mark as Active' : 'Mark as Completed'}
          </Button>

          <Button asChild variant="outline">
            <Link to="/todo-list">Back to List</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItemDetails;
