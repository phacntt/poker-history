import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { HistoriesService } from './histories.service';
import { CreateHistoryRequest } from './dto/create-history-request.dto';
import { RmqService } from '@app/common';

@Controller('history')
export class HistoriesController {
  constructor(private readonly historiesSerivce: HistoriesService, private readonly rmqService: RmqService) {}

  @MessagePattern('get-histories')
  async handleFindHistories(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('DATA NE: ', data);
    await this.historiesSerivce.findHistories(data);
    this.rmqService.ack(context);
  }

  @EventPattern({ cmd: 'history' })
  async handleHistoryCreated(@Payload() data: CreateHistoryRequest, @Ctx() context: RmqContext) {
    console.log('DATA: ', data);
    this.historiesSerivce.createHistory(data);
    this.rmqService.ack(context);
  }
}
