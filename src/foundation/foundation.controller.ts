import { Controller, Post, Body } from '@nestjs/common';
import { FoundationService } from './foundation.service';
import { SendEmailDto } from './dto/send-mail.dto';

@Controller('foundation')
export class FoundationController {
  constructor(private readonly foundationService: FoundationService) {}
  @Post('send-email')
  sendEmails(@Body() sendEmailDto: SendEmailDto) {
    return this.foundationService.sendEmails(sendEmailDto);
  }
}
