import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma.service';
import convertTimestamps from 'src/utilities/convertTimeStamps';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    }));
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return convertTimestamps(user);
  }

  async addUser(userDto: CreateUserDto): Promise<IUser> {
    const userWithSameLogin = await this.prisma.user.findUnique({
      where: {
        login: userDto.login,
      },
    });

    if (userWithSameLogin) {
      throw new BadRequestException(
        `User with login ${userDto.login} already exist`,
      );
    }

    const newUser = await this.prisma.user.create({
      data: userDto,
    });

    const { password, ...userWithoutPassword } = newUser;

    return convertTimestamps(userWithoutPassword);
  }

  async updateUserPassword(userId: string, newPassword: string) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
        version: {
          increment: 1,
        },
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return convertTimestamps(userWithoutPassword);
  }

  async deleteUser(userId: string) {
    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async deleteAllUsers(): Promise<void> {
    await this.prisma.user.deleteMany({});
  }
}
