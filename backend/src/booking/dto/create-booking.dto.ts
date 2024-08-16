// src/booking/dto/create-booking.dto.ts
import {
  IsDateString,
  IsBoolean,
  IsString,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  check_in: Date;

  @IsDateString()
  check_out: Date;

  @IsNumber()
  total: number;

  status: string;

  @IsUUID()
  guest_id: string;

  @IsString({ each: true })
  room_ids: string[];
}

// src/booking/dto/update-booking.dto.ts
