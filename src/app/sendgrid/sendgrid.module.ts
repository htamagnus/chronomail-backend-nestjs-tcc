import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailerSendService } from './service/sendgrid.service';

@Module({
  imports: [HttpModule],
  providers: [MailerSendService],
  exports: [MailerSendService],
})
export class SendgridModule {}
