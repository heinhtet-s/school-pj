import { IsBoolean, IsUUID, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  status?: string;
}
