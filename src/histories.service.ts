import { Injectable, Inject } from '@nestjs/common';
import { History } from './history.entity';
import { CreateHistoryDto } from './histories.dto';
// import { CreateCatDto } from './dto/create-cat.dto';

export type filterHistory = {
  roomId?: string;
};

@Injectable()
export class HistoriesService {
  constructor(
    @Inject('HISTORIES_REPOSITORY')
    private HistoriesRepository: typeof History,
  ) {}

  async findHistories(filter: filterHistory): Promise<History[]> {
    const condition: filterHistory = {};
    console.log('VO GET NHA:>>>>>>>>>');
    if (filter.roomId) {
      condition.roomId = filter.roomId;
    }
    console.log('KAKAKAK: ', await this.HistoriesRepository.findAll<History>({ where: condition }));
    return await this.HistoriesRepository.findAll<History>({ where: condition });
  }

  async createHistory(data: CreateHistoryDto): Promise<History> {
    console.log('VO CREATE NHA:>>>>>>>>>');
    return await this.HistoriesRepository.create<History>({
      roomId: data.roomId,
      action: data.action,
      userId: data.userId,
      roomLvl: data.roomLvl,
      chips: data.chips,
    });
  }
}
