// src/room/room.controller.ts
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoomService } from './room.service';
import { CreateRoomDto, RoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/rooms',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => ((Math.random() * 16) | 0).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createRoomDto,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<RoomDto> {
    console.log(createRoomDto, 'img');
    createRoomDto.room_images = images.map((file) => ({ url: file.filename }));
    return this.roomService.create(createRoomDto);
  }

  @Get()
  async findAll(
    @Query('roomTypeId') roomTypeId?: string,
    @Query('search') search?: string,
  ): Promise<RoomDto[]> {
    const filter = {
      roomTypeId,
      search,
    };
    return this.roomService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoomDto> {
    return this.roomService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/rooms',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => ((Math.random() * 16) | 0).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateRoomDto,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<RoomDto> {
    updateRoomDto.room_images = images.map((file) => ({ url: file.filename }));
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RoomDto> {
    return this.roomService.remove(id);
  }
}
