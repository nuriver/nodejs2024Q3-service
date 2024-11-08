import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  addUser(user: User) {
    this.users.push(user);
  }
}
