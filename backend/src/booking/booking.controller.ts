// src/booking/booking.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Get('user/me')
  async findMyBookings(@Req() req) {
    const userId = req.user.id;
    return this.bookingService.findByGuestId(userId);
  }

  @Put(':id/confirm')
  async confirm(@Param('id') id: string) {
    return this.bookingService.confirm(id);
  }

  @Put(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.bookingService.cancel(id);
  }
}
