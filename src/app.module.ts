import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NonprofitModule } from './nonprofit/nonprofit.module';
import { DatabaseModule } from './database/database.module';
import { TemplateModule } from './template/template.module';
import { EmailModule } from './email/email.module';
import { FoundationModule } from './foundation/foundation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    NonprofitModule,
    DatabaseModule,
    TemplateModule,
    EmailModule,
    FoundationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
