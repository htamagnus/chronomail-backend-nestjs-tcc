import { Test, TestingModule } from '@nestjs/testing';
import { MailerSendService } from '../../mailersend/service/mailersend.service';
import { MailEntity } from '../mail.entity';
import { MailService } from '../mail.service';
import { MailCron } from './mail.cron';

describe('MailCron', () => {
  let mailCron: MailCron;
  let mailService: MailService;
  let sendGridService: MailerSendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailCron,
        {
          provide: MailService,
          useValue: {
            findAll: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
        {
          provide: MailerSendService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailCron = module.get<MailCron>(MailCron);
    mailService = module.get<MailService>(MailService);
    sendGridService = module.get<MailerSendService>(MailerSendService);
  });

  it('should be defined', () => {
    expect(mailCron).toBeDefined();
    expect(mailService).toBeDefined();
    expect(sendGridService).toBeDefined();
  });

  describe('handler', () => {
    it('should send mail every 10 seconds', async () => {
      const mailEntityMockList = [
        { id: '1', dueDate: '2022-04-01T12:00:00Z' },
        { id: '2', dueDate: '2022-04-01T12:00:00Z' },
      ] as MailEntity[];
      jest.spyOn(mailService, 'findAll').mockResolvedValueOnce(mailEntityMockList);
      jest.spyOn(sendGridService, 'sendEmail').mockResolvedValueOnce(true);
      jest.spyOn(mailService, 'updateStatus').mockResolvedValueOnce();
      const result = await mailCron.handler();
      expect(result).toBeUndefined();
      expect(mailService.findAll).toBeCalledTimes(1);
      expect(sendGridService.sendEmail).toBeCalledTimes(2);
      expect(mailService.updateStatus).toBeCalledTimes(2);
    });
  });
});
