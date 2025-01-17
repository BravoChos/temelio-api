import { Module } from '@nestjs/common';
import { FoundationService } from './foundation.service';
import { FoundationController } from './foundation.controller';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [FoundationController],
  providers: [FoundationService, DatabaseService, EmailService],
})
export class FoundationModule {}
