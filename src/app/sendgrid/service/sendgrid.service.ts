import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SendEmailInterface } from '../interface/send-email.interface';

@Injectable()
export class SendgridService {
  private readonly SENDGRID_URL = process.env.SENDGRID_URL;
  private readonly SENDGRID_KEY = process.env.SENDGRID_KEY;

  constructor(private readonly httpService: HttpService) {}

  async sendEmail(data: SendEmailInterface): Promise<boolean> {
    const url = `${this.SENDGRID_URL}/mail/send`;
    const config = {
      headers: { Authorization: `Bearer ${this.SENDGRID_KEY}` },
    };
    const response = await lastValueFrom(this.httpService.post(url, data, config));
    return response.status === HttpStatus.ACCEPTED;
  }
}
