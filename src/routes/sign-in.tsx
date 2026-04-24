import { Button, FormControl, TextInput } from '@primer/react';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
});

function SignIn() {
  return (
    <div className='grid min-h-dvh bg-muted grid-cols-[1fr_2.5rem_minmax(0,var(--container-lg))_2.5rem_1fr] grid-rows-[1fr_auto_1fr] overflow-clip'>
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
                <FormControl className='flex! flex-col! gap-2!' required>
                  <FormControl.Label>Email</FormControl.Label>
                  <TextInput
                    type='email'
                    block
                    className='h-9!'
                    placeholder='someone@example.com'
                  />
                </FormControl>
                <div className='relative mt-6'>
                  <FormControl required className='flex flex-col gap-2'>
                    <FormControl.Label htmlFor='password'>
                      Password
                    </FormControl.Label>
                    <TextInput
                      className='h-9!'
                      type='password'
                      id='password'
                      block
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
                <Button block tabIndex={3} className='mt-10 h-9!' type='submit'>
                  Continue with Email
                </Button>
                <Button block className='mt-4 h-9!'>
                  Continue with Google
                </Button>

                <p className='mt-6 text-sm/6'>
                  <span className='text-slate-600'>New to FambaHub?</span>{' '}
                  <Link
                    className='text-link hover:text-slate-700'
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
