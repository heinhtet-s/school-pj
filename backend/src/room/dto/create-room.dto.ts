import { IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateRoomImageDto {
  @IsString()
  url: string;
}

export class CreateRoomDto {
  @IsString()
  room_name: string;

  @IsString()
  room_type_id: string;

  @IsBoolean()
  status: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoomImageDto)
  room_images: CreateRoomImageDto[];
}

export class RoomImageDto {
  id: string;
  url: string;
  room_id: string;
  created_at: Date;
  updated_at: Date;
}

export class RoomDto {
  id: string;
  room_name: string;
  room_type_id: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  room_images: RoomImageDto[];
}
