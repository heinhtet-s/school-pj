// src/review/dto/create-review.dto.ts
import { IsString, IsInt, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  rating: number;

  @IsString()
  comment: string;

  @IsUUID()
  room_id: string;

  @IsUUID()
  guest_id: string;
}

// src/review/dto/update-review.dto.ts
