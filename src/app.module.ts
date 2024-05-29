import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerSendModule } from './app/mailersend/mailersend.module';
import { MailModule } from './app/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Torna as variáveis de ambiente disponíveis globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST,
      port: Number(process.env.MYSQLPORT),
      database: process.env.MYSQLDATABASE,
      username: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      driver: require('mysql2')
    }),
    ScheduleModule.forRoot(),
    MailerSendModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
