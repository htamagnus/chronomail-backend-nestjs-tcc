import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailCron } from './cron/mail.cron';
import { MailerSendModule } from '../mailersend/mailersend.module';

@Module({
  imports: [TypeOrmModule.forFeature([MailEntity]), MailerSendModule],
  providers: [MailService, MailCron],
  controllers: [MailController],
})
export class MailModule {}
