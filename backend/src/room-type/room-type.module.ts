import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RoomTypeController],
  providers: [RoomTypeService, PrismaService],
})
export class RoomTypeModule {}
