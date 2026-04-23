import { Button } from '@primer/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <div className='max-w-7xl mx-auto px-4 pt-8'>
      <div className='flex items-center gap-x-3'>
        <Button className='h-9!' variant='primary'>
          Primary
        </Button>
        <Button className='h-9!'>Secondary</Button>
        <Button className='h-9!' variant='invisible'>
          Invisible
        </Button>
      </div>
    </div>
  );
}
