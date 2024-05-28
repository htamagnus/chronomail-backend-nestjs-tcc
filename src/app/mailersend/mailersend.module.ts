import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailerSendService } from './service/mailersend.service';

@Module({
  imports: [HttpModule],
  providers: [MailerSendService],
  exports: [MailerSendService],
})
export class MailerSendModule {}
