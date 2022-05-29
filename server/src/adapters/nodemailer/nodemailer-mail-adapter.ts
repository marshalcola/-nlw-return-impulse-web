import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "05a5c72d85dec8",
    pass: "a3e739c2643431"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
      await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Marshal Cola <marshalcola@gmail.com>',
      subject: subject,
      html: body
    })
  }
}