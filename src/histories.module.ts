import { Module } from '@nestjs/common';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';
import { historysProviders } from './histories.provider';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule } from '@app/common';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, RmqModule.register({ name: 'APP' })],
  controllers: [HistoriesController],
  providers: [HistoriesService, ...historysProviders],
})
export class HistoriesModule {}
