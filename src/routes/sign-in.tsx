import { Link, createFileRoute } from '@tanstack/react-router';
import { Button, FormControl, TextInput } from '@primer/react';
import { Icons } from '@/components/icons';
import { metadata } from '@/lib/metadata';
import { authClient } from '@/lib/auth-client';

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

function SignIn() {
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
              <form>
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
                  />
                </FormControl>
                <div className='relative mt-6'>
                  <FormControl
                    required
                    id='password'
                    className='flex flex-col gap-2'
                  >
                    <FormControl.Label htmlFor='password'>
                      Password
                    </FormControl.Label>
                    <TextInput
                      block
                      className='h-9!'
                      type='password'
                      tabIndex={1}
                    />
                  </FormControl>
                  <Link
                    className='absolute top-0 right-0 text-sm/6 text-slate-600 hover:text-slate-800'
                    tabIndex={4}
                    to='/password/reset'
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  block
                  tabIndex={3}
                  variant='primary'
                  className='mt-10 h-9!'
                  type='submit'
                >
                  Continue with Email
                </Button>

                <div>
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

                  <div className='mt-6 grid grid-cols-2 gap-4'>
                    <a
                      href='#'
                      className='flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]'
                    >
                      <svg
                        className='h-5 w-5'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                      </svg>
                      <span className='text-sm font-semibold leading-6'>
                        Facebook
                      </span>
                    </a>

                    <Button
                      className='h-9!'
                      onClick={async () => {
                        await authClient.signIn.social({
                          provider: 'google',
                        });
                      }}
                      leadingVisual={Icons.google}
                    >
                      Google
                    </Button>
                  </div>
                </div>

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
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
