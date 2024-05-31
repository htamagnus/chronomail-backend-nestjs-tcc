import { HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailInterface } from '../interface/mailer-send.interface';
import { Recipient, Sender } from 'mailersend';
import { EmailParams } from 'mailersend';
import { MailerSend } from 'mailersend';

@Injectable()
export class MailerSendService {
  private readonly MAILERSEND_KEY = process.env.MAILERSEND_KEY;

  private mailersend = new MailerSend({
    apiKey: this.MAILERSEND_KEY,
  });

  async sendEmail(data: SendEmailInterface): Promise<boolean> {
    const recipients = data.to.map(to => new Recipient(to.email, to.name));

    const emailParams = new EmailParams()
      .setFrom(new Sender(data.from.email, data.from.name))
      .setTo(recipients)
      .setSubject(data.subject)
      .setHtml(data.html)
      .setText(data.text);

    if (data.cc) {
      const ccRecipients = data.cc.map(cc => new Recipient(cc.email, cc.name));
      emailParams.setCc(ccRecipients);
    }

    if (data.bcc) {
      const bccRecipients = data.bcc.map(bcc => new Recipient(bcc.email, bcc.name));
      emailParams.setBcc(bccRecipients);
    }

    try {
      await this.mailersend.email.send(emailParams);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
