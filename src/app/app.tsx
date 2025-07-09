import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <header className="mb-8 w-full max-w-md">
        <h1 className="py-4 text-center text-3xl font-bold">Todo Manager</h1>
      </header>
      <main className="w-full max-w-md">
        <Outlet />
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Todo App
      </footer>
    </div>
  );
}

export default App;
