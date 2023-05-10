import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport, RmqContext } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = false): RmqOptions {
    console.log(process.env.RABBIT_MQ_HOST);
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${
            this.configService.get<string>(`NODE_ENV`) === 'production' ? this.configService.get<string>(`RABBIT_MQ_HOST`) : 'localhost'
          }:5672`,
        ],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
