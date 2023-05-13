import { Injectable, Inject } from '@nestjs/common';
import { History } from './history.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CreateHistoryRequest } from './dto/create-history-request.dto';

export type filterHistory = {
  roomId?: string;
};

@Injectable()
export class HistoriesService {
  constructor(
    @Inject('HISTORIES_REPOSITORY')
    private HistoriesRepository: typeof History,
    @Inject('APP') private appClient: ClientProxy,
  ) {}

  async findHistories(filter: filterHistory): Promise<History[]> {
    const condition: filterHistory = {};
    console.log('VO GET NHA:>>>>>>>>>');
    if (filter.roomId) {
      condition.roomId = filter.roomId;
    }
    const data = await this.HistoriesRepository.findAll<History>({ where: condition });
    console.log(data);
    this.appClient.emit('send-data', { data });
    return data;
  }

  async createHistory(data: CreateHistoryRequest): Promise<History> {
    console.log('VO CREATE NHA:>>>>>>>>>');
    return await this.HistoriesRepository.create<History>({ data });
  }
}
