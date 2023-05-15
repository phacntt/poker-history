import { NestFactory } from '@nestjs/core';
import { HistoriesModule } from './histories.module';
import { RmqService } from '@app/common';
import { HISTORIES_SERVICE_NAME } from './constant/service';

async function bootstrap() {
  const app = await NestFactory.create(HistoriesModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(HISTORIES_SERVICE_NAME));
  await app.startAllMicroservices();
}
bootstrap();
