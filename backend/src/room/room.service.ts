// src/room/room.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRoomDto, RoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto): Promise<RoomDto> {
    console.log(createRoomDto);
    const { room_name, room_type_id, status, room_images } = createRoomDto;
    console.log(room_name, room_type_id, status, room_images);
    try {
      const room = await this.prisma.room.create({
        data: {
          room_name,
          room_type_id,
          status: Boolean(status),
          room_images: {
            create: room_images,
          },
        },
        include: { room_images: true },
      });
      console.log(room, 'success');
      return room as RoomDto;
    } catch (e) {
      console.log(e);
    }
  }
  async findAll(filter?: {
    roomTypeId?: string;
    search?: string;
  }): Promise<RoomDto[]> {
    return this.prisma.room.findMany({
      where: {
        ...(filter?.roomTypeId && { room_type_id: filter.roomTypeId }),
        ...(filter?.search && {
          OR: [
            { room_name: { contains: filter.search } },
            {
              room_type: {
                name: { contains: filter.search },
              },
            },
          ],
        }),
      },
      include: {
        room_images: true,
        room_type: true,
      },
    });
  }

  async findOne(id: string): Promise<RoomDto> {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: { room_images: true, room_type: true },
    });
    return room as RoomDto;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<RoomDto> {
    const room = await this.prisma.room.update({
      where: { id },
      data: {
        ...updateRoomDto,
        status: Boolean(updateRoomDto.status),
        room_images: {
          create: updateRoomDto.room_images,
        },
      },
      include: { room_images: true },
    });
    return room as RoomDto;
  }

  async remove(id: string): Promise<RoomDto> {
    try {
      await this.prisma.room_booking.deleteMany({
        where: { room_id: id },
      });

      // Delete related reviews
      await this.prisma.review.deleteMany({
        where: { room_id: id },
      });

      // Delete related room_images records
      await this.prisma.room_image.deleteMany({
        where: { room_id: id },
      });

      // Now, delete the room
      const room = await this.prisma.room.delete({
        where: { id },
        include: { room_images: true },
      });

      return room as RoomDto;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to delete room');
    }
  }
}
