import { Resend } from 'resend';

const resend = new Resend(Bun.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: 'No Reply <no-reply@fambahub.com>',
    to,
    subject,
    html,
  });
}
