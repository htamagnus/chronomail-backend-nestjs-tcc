import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendEmailInterface } from 'src/app/mailersend/interface/mailer-send.interface';
import { MailerSendService } from '../../mailersend/service/mailersend.service';
import { MailStatusEnum } from '../enum/mail-status.enum';
import { MailService } from '../mail.service';

@Injectable()
export class MailCron {
  private logger = new Logger(MailCron.name);

  constructor(private readonly mailService: MailService, private readonly mailSendService: MailerSendService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handler() {
    const mailList = await this.mailService.findAll({
      dueDateLte: new Date().toISOString(),
      status: MailStatusEnum.WAITING,
    });

    for (const mail of mailList) {
        const data: SendEmailInterface = {
          from: {
            email: 'no-reply@trial-7dnvo4dz33xl5r86.mlsender.net',
            name: 'Contato | chronomail',
          },
          to: [
            {
              name: mail.destinationName,
              email: mail.destinationAddress,
            },
          ],
          subject: mail.subject,
          html: mail.body,
          text: mail.body
        };
        try {
          await this.mailSendService.sendEmail(data);
          await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
          this.logger.log('E-mail enviado com sucesso');
          this.logger.log(`Status atualizado para ${MailStatusEnum.SENT}`)
        } catch (error) {
          this.logger.error('Erro ao enviar e-mail', error);
        }
      }
    }
  }
