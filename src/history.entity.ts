import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class History extends Model {
  @Column
  name: string;

  @Column
  age: number;
}
