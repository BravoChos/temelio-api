import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TemplateController],
  providers: [TemplateService, DatabaseService],
})
export class TemplateModule {}
