import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './app';
import TodoListPage from '@/features/todo/pages/TodoListPage';
import TodoItemPage from '@/features/todo/pages/TodoItemPage';

export const router = createBrowserRouter([
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
