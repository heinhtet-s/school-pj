// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const getUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!getUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      getUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authResponse(getUser);
  }
  async authResponse(user: any) {
    console.log(user);
    const payload = { email: user.email, sub: user.id, role: user.role };
    console.log(payload);

    const data = {
      access_token: this.jwtService.sign(payload),
      ...user,
      ...payload,
    };
    return data;
  }
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const getUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    console.log(getUser);
    if (getUser) {
      throw new UnauthorizedException('duplicate email');
    }

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        phone: '',
        guest: {
          create: {}, // Creates a guest associated with this user
        },
      },
      include: {
        guest: true, // Include the guest data in the response
      },
    });
    return this.authResponse(user);

    // Automatically login the user after registration
  }
}
