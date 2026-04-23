import { createFileRoute, redirect } from '@tanstack/react-router';
import { getSession } from '@/lib/utils';

export const Route = createFileRoute('/_protected/portal')({
  beforeLoad: async () => {
    const session = await getSession();

    if (!session) {
      throw redirect({ to: '/sign-in' });
    }

    return { user: session.user };
  },
  component: PortalIndex,
});

function PortalIndex() {
  const { user } = Route.useRouteContext();

  return <div>Welcome, {user.name}!</div>;
}
