import { Module } from '@nestjs/common';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';
import { historysProviders } from './histories.provider';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'lib/common/src/database/database.module';
import { RmqModule } from 'lib/common/src/rmq/rmq.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, RmqModule],
  controllers: [HistoriesController],
  providers: [HistoriesService, ...historysProviders],
})
export class HistoriesModule {}
