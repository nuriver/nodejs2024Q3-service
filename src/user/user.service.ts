import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users; 
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async addUser(user: User): Promise<void> {
    this.users.push(user);
  }
}