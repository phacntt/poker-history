import { Injectable, Inject } from '@nestjs/common';
import { History } from './history.entity';
import { CreateHistoryDto } from './histories.dto';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class HistoriesService {
  constructor(
    @Inject('HISTORIES_REPOSITORY')
    private HistoriesRepository: typeof History,
  ) {}

  async findAll(): Promise<History[]> {
    return this.HistoriesRepository.findAll<History>();
  }

  async createHistory(data: any): Promise<History> {
    return await this.HistoriesRepository.create<History>({
      name: data.name,
      age: data.age,
    });
  }
}
