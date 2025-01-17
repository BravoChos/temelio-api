import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailsDto } from './dto/send-emails.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('log/:senderId')
  findEmailLogsById(@Param('senderId') senderId: string) {
    return this.emailService.findEmailLogsById(senderId);
  }

  @Post('send')
  sendEmails(@Body() sendEmailsDto: SendEmailsDto) {
    return this.emailService.sendEmails(sendEmailsDto);
  }
}
