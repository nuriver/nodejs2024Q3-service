import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma.service';
import convertTimestamps from 'src/utilities/convertTimeStamps';
import hashPassword from 'src/utilities/hashPassword';
import correctPassword from 'src/utilities/correctPassword';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private readonly CRYPT_SALT = process.env.CRYPT_SALT;

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

  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    return user;
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

    const hashedPassword = await hashPassword(
      userDto.password,
      +this.CRYPT_SALT,
    );

    const newUser = await this.prisma.user.create({
      data: {
        ...userDto,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = newUser;

    return convertTimestamps(userWithoutPassword);
  }

  async updateUserPassword(
    updatePasswordDto: UpdatePasswordDto,
    userId: string,
  ) {
    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const isPasswordCorrect = await correctPassword(
      updatePasswordDto.oldPassword,
      userToUpdate.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Incorrect old password');
    }

    const hashedPassword = await hashPassword(
      updatePasswordDto.newPassword,
      +this.CRYPT_SALT,
    );

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
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
