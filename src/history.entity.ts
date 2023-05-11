import { Table, Column, Model } from 'sequelize-typescript';
import { EAction, ERoomLvl } from './constant/types';

@Table
export class History extends Model {
  @Column
  roomId: string;

  @Column({ type: ERoomLvl })
  roomLvl: string;

  @Column
  userId: string;

  @Column({ type: EAction })
  action: string;

  @Column
  chips: number;
}
