import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoggingService } from '../customLogger/customLogger.service';
import { Request, Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private loggingService: LoggingService,
  ) {}

  @Public()
  @Delete('deleteAll')
  async deleteAllUsers(): Promise<void> {
    await this.userService.deleteAllUsers();
  }

  @Get()
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
    this.loggingService.commonLogger(req, res.statusCode, users);
  }

  @Get(':id')
  async getUserById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = await this.userService.getUserById(id);
    res.status(200).json(user);
    this.loggingService.commonLogger(req, res.statusCode, user);
  }

  @Post()
  async addUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const userResponseData = await this.userService.addUser(createUserDto);
    res.status(201).json(userResponseData);
    this.loggingService.commonLogger(req, res.statusCode, userResponseData);
  }

  @Put(':id')
  async updateUserPassword(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.userService.updateUserPassword(
      updatePasswordDto,
      id,
    );

    res.status(200).json(updatedUser);
    this.loggingService.commonLogger(req, res.statusCode, updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userService.deleteUser(id);
    res.status(204).json({});
    this.loggingService.commonLogger(req, res.statusCode, {});
  }
}
