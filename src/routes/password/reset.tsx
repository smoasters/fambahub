import { Button, FormControl, TextInput } from '@primer/react';
import { createFileRoute } from '@tanstack/react-router';
import { metadata } from '@/lib/metadata';

export const Route = createFileRoute('/password/reset')({
  component: PasswordReset,
  head: () => ({
    meta: [
      ...metadata({
        title: 'Forgot Password - FambaHub',
        description:
          'Discover places, experiences, and travel ideas across Zimbabwe and beyond. Plan, explore, and book with ease with FambaHub.',
      }),
    ],
  }),
});

function PasswordReset() {
  return (
    <main className='bg-default min-h-dvh flex items-center justify-center'>
      <div className='flex flex-col mx-auto max-w-90 p-5 pb-24 gap-12 w-full'>
        <img src='/favicon.svg' className='size-10' />
        <div>
          <h1 className='text-sm/6 font-semibold'>Reset your password</h1>
          <p className='mt-4 text-sm/6 text-(--fgColor-neutral)'>
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        <form className='flex flex-col gap-4'>
          <FormControl required className='flex flex-col gap-2'>
            <FormControl.Label htmlFor='email'>Email</FormControl.Label>
            <TextInput
              className='h-9!'
              block
              type='email'
              placeholder='someone@example.com'
              id='email'
            />
          </FormControl>
          <Button className='mt-4' type='submit' block>
            Reset your password
          </Button>
        </form>
      </div>
    </main>
  );
}
