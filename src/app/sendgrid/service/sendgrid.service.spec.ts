import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SendEmailInterface } from '../interface/send-email.interface';
import { MailerSendService } from './sendgrid.service';

describe('SendgridService', () => {
  let sendGridService: MailerSendService;
  let httpService: HttpService;

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

    sendGridService = module.get<MailerSendService>(MailerSendService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
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
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(of({ status: 202, statusText: 'ACCEPTED', config: {}, headers: {}, data: '' }));
      // Act
      const result = await sendGridService.sendEmail(data);
      // Assert
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
