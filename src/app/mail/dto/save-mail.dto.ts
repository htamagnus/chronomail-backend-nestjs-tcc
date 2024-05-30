import { IsEmail, IsISO8601, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveMailDto {
  @ApiProperty({ description: 'The name of the email recipient' })
  @IsNotEmpty()
  destinationName: string;

  @ApiProperty({ description: 'The email address of the recipient' })
  @IsNotEmpty()
  @IsEmail()
  destinationAddress: string;

  @ApiProperty({ description: 'The due date in ISO 8601 format' })
  @IsNotEmpty()
  @IsISO8601()
  dueDate: string;

  @ApiProperty({ description: 'The subject of the email' })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'The body content of the email' })
  @IsNotEmpty()
  body: string;
}
