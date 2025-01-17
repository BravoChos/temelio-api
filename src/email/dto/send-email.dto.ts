import { IsString, IsEmail } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  to: string;

  @IsEmail()
  from: string;

  @IsString()
  sender_id: string;

  @IsString()
  template_id: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}
