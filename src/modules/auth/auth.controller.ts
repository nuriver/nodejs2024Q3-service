import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggingService } from '../customLogger/customLogger.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private loggingService: LoggingService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  async signIn(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    await this.authService.signIn(createUserDto.login, createUserDto.password);
  }
}
