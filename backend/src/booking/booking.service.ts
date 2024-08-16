// src/booking/booking.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const { room_ids, guest_id, ...bookingData } = createBookingDto;
      console.log(guest_id);
      // Check if the guest exists

      const data = await this.prisma.booking.create({
        data: {
          guest_id,
          ...bookingData,
          room_bookings: {
            create: room_ids.map((room_id) => ({ room_id })),
          },
        },
        include: {
          room_bookings: true,
        },
      });

      return data;
    } catch (e) {
      console.error('Error creating booking:', e);
      throw new Error(
        'Could not create booking. Please check guest ID and other details.',
      );
    }
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        room_bookings: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        room_bookings: true,
      },
    });
  }

  async findByGuestId(guestId: string) {
    return this.prisma.booking.findMany({
      where: { guest_id: guestId },
      include: {
        room_bookings: {
          include: {
            room: true,
          },
        },
      },
    });
  }

  async confirm(id: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'confirm' },
    });
  }

  async cancel(id: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'cancel' },
    });
  }
}
