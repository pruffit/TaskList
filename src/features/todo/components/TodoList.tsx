import { Link } from 'react-router-dom';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Todo } from '@/features/todo/types/todo';

const TodoList = ({ todos, onToggle }: { todos: Todo[]; onToggle: (id: string) => void }) => {
  if (!todos.length) {
    return <p className="py-4 text-center text-gray-500">No tasks found</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="group flex items-center space-x-2">
          <Checkbox
            id={todo.id}
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
          />
          <Link
            to={`/todo-item/${todo.id}`}
            className={`flex-1 rounded p-2 text-sm transition-colors hover:bg-gray-100 ${
              todo.completed ? 'text-gray-500 line-through' : ''
            }`}
          >
            {todo.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
