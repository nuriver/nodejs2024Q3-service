import { Injectable } from '@nestjs/common';
import { IUser, UserResponseData } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  private users: IUser[] = [];

  async getAllUsers(): Promise<IUser[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async addUser(userDto: CreateUserDto): Promise<UserResponseData> {
    const userResponseData = {
      id: uuidv4(),
      login: userDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const user: IUser = {
      ...userResponseData,
      password: userDto.password,
    };

    this.users.push(user);

    return userResponseData;
  }

  async updateUserPassword(userId: string, newPassword: string) {
    const user = await this.getUserById(userId);
    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version = user.version + 1;
    return user;
  }

  async deleteUser(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
