import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateRoomImageDto {
  @IsString()
  url: string;
}

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  room_name?: string;

  @IsString()
  @IsOptional()
  room_type_id?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRoomImageDto)
  @IsOptional()
  room_images?: UpdateRoomImageDto[];
}
