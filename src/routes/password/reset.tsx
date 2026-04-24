import { useState } from 'react';
import { z } from 'zod';
import { Button, FormControl, Spinner, TextInput } from '@primer/react';
import { createFileRoute } from '@tanstack/react-router';

import { authClient } from '@/lib/auth-client';
import { metadata } from '@/lib/metadata';

const resetPasswordSchema = z.object({
  email: z.string().trim().pipe(z.email('Please enter a valid email address')),
});

const getResetRedirectUrl = () => {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  return `${baseUrl}/reset-password`;
};

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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate email with Zod
    const result = resetPasswordSchema.safeParse({ email });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message;
      setError(errorMessage || 'Invalid email');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.requestPasswordReset({
        email: result.data.email,
        redirectTo: getResetRedirectUrl(),
      });

      if (authError) {
        setError(`We can't find a user with that email address.`);
        return;
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='bg-default h-dvh flex items-center justify-center'>
      <div className='flex flex-col mx-4 lg:mx-auto lg:max-w-100 lg:p-5 pb-24 gap-12 w-full'>
        <img src='/favicon.svg' className='size-10' />
        <div>
          <h1 className='text-sm/6 font-semibold'>Reset your password</h1>
          <p className='mt-4 text-sm/6 text-(--fgColor-neutral)'>
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <FormControl id='email' required className='flex flex-col gap-2'>
            <FormControl.Label htmlFor='email'>Email</FormControl.Label>
            <TextInput
              className='h-9!'
              block
              type='email'
              placeholder='someone@example.com'
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                // Clear error when user starts typing
                if (error) setError(null);
              }}
              disabled={loading}
            />
            {error && (
              <FormControl.Validation variant='error'>
                {error}
              </FormControl.Validation>
            )}
            {success && (
              <FormControl.Validation variant='success'>
                Check your email for a password reset link
              </FormControl.Validation>
            )}
          </FormControl>
          <Button className='mt-4' type='submit' block disabled={loading}>
            {loading ? (
              <div className='flex items-center justify-center gap-2'>
                <Spinner size='small' />
                Sending...
              </div>
            ) : (
              'Reset your password'
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
