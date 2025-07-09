import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const TodoForm = ({ onSubmit }: { onSubmit: (text: string) => void }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default TodoForm;
