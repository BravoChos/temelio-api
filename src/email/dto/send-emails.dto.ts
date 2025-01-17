import { IsString, IsEmail, IsArray } from 'class-validator';

export class SendEmailsDto {
  @IsArray()
  emails: [string];

  @IsEmail()
  from: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsString()
  cc: [string];

  @IsString()
  sender_id: string;

  @IsString()
  template_id: string;
}
