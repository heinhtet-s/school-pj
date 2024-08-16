import { IsString, IsNumber } from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price_per_night: number;
}
