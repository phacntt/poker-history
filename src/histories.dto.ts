import { Length } from 'sequelize-typescript';

export class CreateHistoryDto {
  roomId: string;

  roomLvl: string;

  userId: string;

  action: string;

  chips: number;
}
