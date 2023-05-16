import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHistoryRequest {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  action: string;

  @IsString()
  userId: string;

  @IsString()
  roomLvl: string;

  @IsNumber()
  chips: number;
}
