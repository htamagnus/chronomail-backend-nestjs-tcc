import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailService } from './mail.service';

@ApiTags('mails')
@Controller('api/v1/mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: 'Save a mail in database' })
  @ApiResponse({ status: 201, description: 'The mail has been successfully saved.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async save(@Body() body: SaveMailDto) {
    return this.mailService.save(body);
  }
}
