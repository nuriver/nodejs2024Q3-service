import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    const user = await this.userService.getUserById(id);

    return user;
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    const userResponseData = await this.userService.addUser(createUserDto);
    return userResponseData;
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new ForbiddenException('Incorrect old password');
    }

    return await this.userService.updateUserPassword(
      id,
      updatePasswordDto.newPassword,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userService.deleteUser(id);
  }

  @Delete('deleteAll')
  async deleteAllUsers(): Promise<void> {
    await this.userService.deleteAllUsers();
  }
}
