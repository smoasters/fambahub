import { Link, createFileRoute } from '@tanstack/react-router';
import { Button, FormControl, TextInput } from '@primer/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { metadata } from '@/lib/metadata';
import { authClient } from '@/lib/auth-client';
import { Icons } from '@/components/icons';

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
  head: () => ({
    meta: [
      ...metadata({
        title: 'Sign In - FambaHub',
        description:
          'Discover places, experiences, and travel ideas across Zimbabwe and beyond. Plan, explore, and book with ease with FambaHub.',
      }),
    ],
  }),
});

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

function SignIn() {
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL: '/portal',
      newUserCallbackURL: '/welcome',
      errorCallbackURL: '/error',
    });
    if (!error) setMagicLinkSent(true);
  });

  return (
    <div className='grid h-dvh bg-muted grid-cols-[1fr_2.5rem_minmax(0,var(--container-lg))_2.5rem_1fr] grid-rows-[1fr_auto_1fr] overflow-clip'>
      <div className='col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-muted bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--borderColor-muted)_0,var(--borderColor-muted)_1px,transparent_0,transparent_50%)]' />
      <div className='col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-muted bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--borderColor-muted)_0,var(--borderColor-muted)_1px,transparent_0,transparent_50%)]' />
      <main className='grid grid-cols-1 max-sm:col-span-full max-sm:col-start-1 max-sm:row-span-full sm:line-y sm:col-start-3 sm:row-start-2 sm:-mx-px sm:p-2.25'>
        <div className='grid grid-cols-1 items-center bg-muted max-sm:p-6 sm:p-10'>
          <div className='grid grid-cols-1 gap-10'>
            <div className='flex items-start'>
              <img src='/favicon.svg' className='size-10' />
            </div>
            <div>
              <h1 className='sr-only'>Log in to your FambaHub account</h1>
              <form onSubmit={onSubmit}>
                <FormControl
                  id='email'
                  className='flex! flex-col! gap-2!'
                  required
                >
                  <FormControl.Label htmlFor='email'>Email</FormControl.Label>
                  <TextInput
                    type='email'
                    block
                    className='h-9!'
                    placeholder='someone@example.com'
                    {...register('email')}
                    validationStatus={
                      errors.email
                        ? 'error'
                        : magicLinkSent
                          ? 'success'
                          : undefined
                    }
                  />
                  {errors.email && (
                    <FormControl.Validation variant='error'>
                      {errors.email.message}
                    </FormControl.Validation>
                  )}
                  {magicLinkSent && (
                    <FormControl.Validation variant='success'>
                      Magic link sent! Check your inbox.
                    </FormControl.Validation>
                  )}
                </FormControl>

                <Button
                  block
                  variant='primary'
                  className='mt-6 h-9!'
                  type='submit'
                  loading={isSubmitting}
                  disabled={magicLinkSent}
                >
                  {magicLinkSent ? 'Check your inbox' : 'Continue with Email'}
                </Button>
              </form>

              <div className='relative mt-8'>
                <div
                  className='absolute inset-0 flex items-center'
                  aria-hidden='true'
                >
                  <div className='w-full border-t border-gray-200' />
                </div>
                <div className='relative flex justify-center text-sm font-medium leading-6'>
                  <span className='bg-muted text-default px-6'>OR</span>
                </div>
              </div>

              <Button
                block
                className='h-9! mt-6'
                onClick={async () => {
                  await authClient.signIn.social({ provider: 'google' });
                }}
                leadingVisual={Icons.google}
              >
                Continue with Google
              </Button>

              <p className='mt-6 text-sm/6'>
                <span className='text-slate-600'>New to FambaHub?</span>
                <Link
                  className='text-link mx-1 hover:text-slate-700'
                  tabIndex={5}
                  to='/sign-up'
                >
                  Get Started <span aria-hidden='true'>→</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
