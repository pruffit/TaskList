import { createHashRouter, Navigate } from 'react-router-dom';
import App from './app';
import { TodoListPage, TodoItemPage } from '@/features/todo';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/todo-list" replace />,
      },
      {
        path: 'todo-list',
        element: <TodoListPage />,
      },
      {
        path: 'todo-item/:id',
        element: <TodoItemPage />,
      },
    ],
  },
]);
