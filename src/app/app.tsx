import { Outlet } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/shared/contexts/theme-context';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4 dark:bg-gray-900">
      <header className="mb-8 flex w-full max-w-md items-center justify-between">
        <h1 className="py-4 text-center text-3xl font-bold dark:text-white">Todo Manager</h1>
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          aria-label="Toggle theme"
          className="rounded-full"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </header>
      <main className="w-full max-w-md">
        <Outlet />
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Todo App
      </footer>
    </div>
  );
}

export default App;
