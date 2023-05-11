import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { HistoriesService } from './histories.service';
import { RmqService } from 'lib/common/src/rmq/rmq.service';

@Controller('history')
export class HistoriesController {
  constructor(private readonly historiesSerivce: HistoriesService, private readonly rmqService: RmqService) {}

  @MessagePattern('get-histories')
  async handleFindHistories(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('DATA NE: ', data);
    this.historiesSerivce.findHistories(data);
    this.rmqService.ack(context);
  }

  @EventPattern('create-history')
  async handleHistoryCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('DATA: ', data);
    this.historiesSerivce.createHistory(data);
    this.rmqService.ack(context);
  }
}
