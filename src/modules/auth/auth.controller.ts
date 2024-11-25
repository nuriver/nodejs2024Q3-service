import { Body, Controller, Post, Req, Res } from '@nestjs/common';
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
  async refresh(@Res() res: Response, @Body() refreshToken?: string) {
    const message = 'refresh endpoint';
    res.status(200).json(refreshToken);
  }
}
