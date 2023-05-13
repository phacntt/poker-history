import { NestFactory } from '@nestjs/core';
import { HistoriesModule } from './histories.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(HistoriesModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('HISTORIES'));
  await app.startAllMicroservices();
}
bootstrap();
