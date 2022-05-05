import { MailAdapter, SendMailData } from "../mail-adapters";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6fbeaa80e51708",
      pass: "244c2f47b02ccb"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Brayan Quintino <brayangestor01@gmail.com>',
            subject,
            html: body,
        });
    }
}