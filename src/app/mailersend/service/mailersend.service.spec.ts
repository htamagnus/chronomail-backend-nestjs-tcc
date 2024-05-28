import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailInterface } from '../interface/mailer-send.interface';
import { MailerSendService } from './mailersend.service';
import { MailerSend, EmailParams, Recipient, Sender } from 'mailersend';

jest.mock('mailersend', () => {
  return {
    MailerSend: jest.fn().mockImplementation(() => {
      return {
        email: {
          send: jest.fn(),
        },
      };
    }),
    EmailParams: jest.fn().mockImplementation(() => {
      return {
        setFrom: jest.fn().mockReturnThis(),
        setTo: jest.fn().mockReturnThis(),
        setSubject: jest.fn().mockReturnThis(),
        setHtml: jest.fn().mockReturnThis(),
        setText: jest.fn().mockReturnThis(),
        setCc: jest.fn().mockReturnThis(),
        setBcc: jest.fn().mockReturnThis(),
      };
    }),
    Recipient: jest.fn().mockImplementation((email: string, name: string) => {
      return { email, name };
    }),
    Sender: jest.fn().mockImplementation((email: string, name: string) => {
      return { email, name };
    }),
  };
});

describe('MailerSendService', () => {
  let mailerSendService: MailerSendService;
  let httpService: HttpService;
  let mailerSend: MailerSend;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerSendService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    mailerSendService = module.get<MailerSendService>(MailerSendService);
    httpService = module.get<HttpService>(HttpService);

    mailerSend = new MailerSend({ apiKey: 'test' });
    mailerSendService['mailersend'] = mailerSend;
  });

  it('should be defined', () => {
    expect(mailerSendService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email with success', async () => {
      // Arrange
      const data: SendEmailInterface = {
        from: {
          email: 'dsadas',
          name: 'dsadas',
        },
        to: [
          {
            email: 'dsadas',
            name: 'dsadas',
          },
        ],
        subject: 'dsadas',
        html: 'dsadas',
        text: 'dsadas',
      };

      (mailerSend.email.send as jest.Mock).mockResolvedValueOnce(undefined);

      // Act
      const result = await mailerSendService.sendEmail(data);

      // Assert
      expect(result).toBeTruthy();
      expect(mailerSend.email.send).toBeCalledTimes(1);
    });
  });
});
