import { IsString, IsEmail, IsOptional } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  from: string;

  @IsString()
  sender_id: string;

  @IsString()
  template_id: string;

  @IsEmail()
  cc: [string];

  @IsOptional()
  @IsString()
  type?: string;
}
