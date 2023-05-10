import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { History } from './history.entity';
import { HistoriesService } from './histories.service';
import { RmqService } from 'lib/common/src/rmq/rmq.service';

@Controller('history')
export class HistoriesController {
  constructor(private readonly historiesSerivce: HistoriesService, private readonly rmqService: RmqService) {}

  // @MessagePattern({ cmd: 'greeting' })
  // async getGreetingMessage(): Promise<History[]> {
  //   try {
  //     const getHistory = await this.historiesSerivce.findAll();
  //     getHistory.map(history => console.log(history.dataValues));
  //     return getHistory;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // @MessagePattern({ cmd: 'greeting-async' })
  // async getGreetingMessageAysnc(name: string): Promise<string> {
  //   return `Hello ${name} Async`;
  // }

  // @EventPattern('book-created')
  // async handleBookCreatedEvent(data: Record<string, unknown>) {
  //   console.log('1: ', data);
  // }

  // @MessagePattern({ cmd: 'get-all-history' })
  // async handleOrderCreated(data: any, @Ctx() context: RmqContext) {
  //   console.log('DATA NE: ', data);
  //   this.historiesSerivce.findAll();
  //   this.rmqService.ack(context);
  // }

  @EventPattern('create-history')
  async handleHistoryCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('DATA: ', data);
    this.historiesSerivce.createHistory(data);
    this.rmqService.ack(context);
  }
}
