import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Optional: Load environment variables
      isGlobal: true,
    }),
    UserModule,
    RoomTypeModule,
    BookingModule,
    MulterModule.register({
      dest: './uploads', // Base directory for file uploads
    }),
    ReviewModule,
    AuthModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
