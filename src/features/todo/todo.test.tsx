import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, vi, beforeEach } from 'vitest';
import { TodoListPage, TodoItemPage } from '@/features/todo';
import { Todo } from '@/features/todo/types/todo';

describe('TodoFeature', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('adds and displays new todo', async () => {
    render(
      <MemoryRouter initialEntries={['/todo-list']}>
        <Routes>
          <Route path="/todo-list" element={<TodoListPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Test task')).toBeInTheDocument();
    });
    expect(screen.getByText('1 task left')).toBeInTheDocument();
  });

  test('toggles todo status', async () => {
    render(
      <MemoryRouter initialEntries={['/todo-list']}>
        <Routes>
          <Route path="/todo-list" element={<TodoListPage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Add a new task...'), {
      target: { value: 'Test task' },
    });
    fireEvent.click(screen.getByText('Add'));

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
    expect(screen.getByText('0 tasks left')).toBeInTheDocument();
  });

  test('navigates to todo item page', async () => {
    render(
      <MemoryRouter initialEntries={['/todo-list']}>
        <Routes>
          <Route path="/todo-list" element={<TodoListPage />} />
          <Route path="/todo-item/:id" element={<TodoItemPage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Add a new task...'), {
      target: { value: 'Test task' },
    });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(screen.getByText('Test task')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Test task'));

    await waitFor(() => {
      expect(screen.getByText('Task Details')).toBeInTheDocument();
      expect(screen.getByText('Test task')).toBeInTheDocument();
    });
  });

  test('displays todo item details', async () => {
    const testTodo: Todo = {
      id: 'test-id',
      text: 'Test task',
      completed: false,
    };

    localStorage.setItem('todos', JSON.stringify([testTodo]));

    render(
      <MemoryRouter initialEntries={['/todo-item/test-id']}>
        <Routes>
          <Route path="/todo-item/:id" element={<TodoItemPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Task Details')).toBeInTheDocument();
      expect(screen.getByText('Test task')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  test('marks todo as completed from details page', async () => {
    const testTodo: Todo = {
      id: 'test-id',
      text: 'Test task',
      completed: false,
    };

    localStorage.setItem('todos', JSON.stringify([testTodo]));

    render(
      <MemoryRouter initialEntries={['/todo-item/test-id']}>
        <Routes>
          <Route path="/todo-item/:id" element={<TodoItemPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const button = await screen.findByText('Mark as Completed');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('Mark as Active')).toBeInTheDocument();
    });
  });

  test('shows not found for invalid todo id', async () => {
    render(
      <MemoryRouter initialEntries={['/todo-item/invalid-id']}>
        <Routes>
          <Route path="/todo-item/:id" element={<TodoItemPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Task Not Found')).toBeInTheDocument();
      expect(screen.getByText('Back to Tasks')).toBeInTheDocument();
    });
  });
});
