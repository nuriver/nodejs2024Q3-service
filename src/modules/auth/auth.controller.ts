import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggingService } from '../customLogger/customLogger.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UserService } from '../user/user.service';
import { Refresh } from 'src/common/decorators/refresh.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private loggingService: LoggingService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  async signup(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.userService.addUser(createUserDto);

    res.status(201).json(user);
    this.loggingService.commonLogger(req, res.statusCode, user);
  }

  @Public()
  @Post('login')
  async signIn(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const token = await this.authService.signIn(
      createUserDto.login,
      createUserDto.password,
    );

    res.status(200).json(token);
    this.loggingService.commonLogger(req, res.statusCode, token);
  }

  @Refresh()
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body?: { refreshToken: string },
  ) {
    const response = await this.authService.refresh(body.refreshToken);
    res.status(200).json(response);
    this.loggingService.commonLogger(req, res.statusCode, response);
  }

  @Public()
  @Get('debug')
  debug() {
    console.log('JWT_REFRESH_SECRET_KEY:', process.env.JWT_REFRESH_SECRET_KEY);
    console.log('REFRESH_TOKEN_EXPIRE_TIME:', process.env.REFRESH_EXPIRE);
  }
}
