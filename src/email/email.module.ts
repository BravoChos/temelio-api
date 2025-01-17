import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TemplateService } from 'src/template/template.service';
import { FoundationService } from 'src/foundation/foundation.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmailController],
  providers: [
    EmailService,
    TemplateService,
    FoundationService,
    DatabaseService,
  ],
})
export class EmailModule {}
