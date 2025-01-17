import { Module } from '@nestjs/common';
import { NonprofitService } from './nonprofit.service';
import { NonprofitController } from './nonprofit.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NonprofitController],
  providers: [NonprofitService, DatabaseService],
})
export class NonprofitModule {}
