import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import type { ClassValue } from 'clsx';
import { auth } from '@/lib/auth';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    return session;
  },
);

export const ensureSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error('Unauthorized');
    }

    return session;
  },
);
