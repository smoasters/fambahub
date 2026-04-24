// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Avoid any of the types issues
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Better Auth appends ?token=... to the redirectTo URL you passed in
  // authClient.requestPasswordReset({ email, redirectTo: '/reset-password' })
  const token = new URLSearchParams(window.location.search).get('token');

  if (!token) {
    // TODO: render an "invalid or expired link" UI here
    return <div>Invalid or expired reset link.</div>;
  }

  async function handleSubmit() {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    // eslint-disable-next-line no-shadow
    const { error } = await authClient.resetPassword({
      newPassword,
      token,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? 'Something went wrong');
      return;
    }

    // TODO: show a success message before redirecting if you want
    navigate({ to: '/sign-in' });
  }

  return (
    <div>
      {/* TODO: build your UI here, wire up the fields below */}

      {/* controlled input for new password */}
      <input
        type='password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      {/* controlled input for confirm password */}
      <input
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* error state — render your error UI here */}
      {error && <p>{error}</p>}

      {/* submit — wire your button's onClick to handleSubmit */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Resetting...' : 'Reset password'}
      </button>
    </div>
  );
}
