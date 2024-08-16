import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}

// src/review/dto/review.dto.ts
export class ReviewDto {
  id: string;
  rating: number;
  comment: string;
  room_id: string;
  guest_id: string;
  created_at: Date;
  updated_at: Date;
}
