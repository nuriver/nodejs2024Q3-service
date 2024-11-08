import { Injectable } from '@nestjs/common';
import { User, UserResponseData } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | undefined> {
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

    const user: User = {
      ...userResponseData,
      password: userDto.password,
    };

    this.users.push(user);

    return userResponseData;
  }

  async updateUserPassword(userId: string, newPassword: string) {
    const user = await this.getUserById(userId);
    user.password = newPassword;
  }

  async deleteUser(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
