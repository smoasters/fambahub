import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { magicLink } from 'better-auth/plugins';
import db from '@/db/drizzle';
import * as schema from '@/db/schema';
import { sendEmail, sendMagicLinkEmail } from '@/components/emails';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
    usePlural: true,
  }),
  socialProviders: {
    google: {
      clientId: Bun.env.GOOGLE_CLIENT_ID as string,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: Bun.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    // eslint-disable-next-line @typescript-eslint/require-await
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log(token, request);
      void sendEmail({
        to: user.email,
        subject: 'Reset your password',
        react: `<p>Click <a href="${url}">here</a> to reset your password. Link expires in 1 hour.</p>`,
      });
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    onPasswordReset: async ({ user }, request) => {
      console.log(request);
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
        console.log(`token=${token},metadata=${metadata}, ctx=${ctx} `);
        await sendMagicLinkEmail(email, url);
      },
    }),
    tanstackStartCookies(),
  ],
});
