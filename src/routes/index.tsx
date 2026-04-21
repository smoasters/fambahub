import { Button } from '@primer/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <div className='max-w-7xl mx-auto px-4 pt-8'>
      <Button>Railway</Button>
    </div>
  );
}
