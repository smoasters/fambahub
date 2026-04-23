import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { getSession } from '@/lib/utils';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.href },
      });
    }

    return { user: session.user };
  },
  component: () => <Outlet />,
});
