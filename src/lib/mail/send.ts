import type { SendMailOptions } from 'nodemailer';
import { getMailTransport } from '@/lib/mail/transport';

export async function sendMail(options: SendMailOptions) {
  const transport = getMailTransport();
  const fromAddress = process.env.MAIL_FROM;
  const toAddress = process.env.MAIL_TO;

  if (!fromAddress || !toAddress) {
    throw new Error('MAIL_FROM and MAIL_TO must be set in your .env file.');
  }

  return transport.sendMail({
    ...options,
    from: options.from || fromAddress,
    to: options.to || toAddress,
  });
}
