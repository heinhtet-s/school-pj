import { Injectable } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomTypeService {
  constructor(private prisma: PrismaService) {}

  create(createRoomTypeDto: CreateRoomTypeDto) {
    return this.prisma.room_type.create({ data: createRoomTypeDto });
  }

  findAll() {
    return this.prisma.room_type.findMany();
  }

  findOne(id: string) {
    return this.prisma.room_type.findUnique({ where: { id } });
  }

  update(id: string, updateRoomTypeDto: UpdateRoomTypeDto) {
    return this.prisma.room_type.update({
      where: { id },
      data: updateRoomTypeDto,
    });
  }

  remove(id: string) {
    return this.prisma.room_type.delete({ where: { id } });
  }
}
