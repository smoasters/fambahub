import { Resend } from 'resend';
import MagicLinkEmail from './magic-link';

const resend = new Resend(Bun.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: any;
}) {
  return resend.emails.send({
    from: 'No Reply <no-reply@fambahub.com>',
    to,
    subject,
    react,
  });
}

export async function sendMagicLinkEmail(to: string, url: string) {
  return sendEmail({
    to,
    subject: 'Your FambaHub magic link',
    react: MagicLinkEmail({ url }),
  });
}
