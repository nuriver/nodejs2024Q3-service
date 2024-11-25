import {
  forwardRef,
  Injectable,
  UnauthorizedException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import correctPassword from 'src/utilities/correctPassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new ForbiddenException(`User with login ${login} is not found`);
    }

    const isPasswordCorrect = await correctPassword(pass, user.password);

    if (user && !isPasswordCorrect) {
      throw new ForbiddenException('Wrong password');
    }

    try {
      const payload = { userId: user.id, login: user.login };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.REFRESH_EXPIRE,
      });

      return {
        accessToken,
        refreshToken,
        userId: user.id,
        login: user.login,
      };
    } catch (error) {
      console.error('Error generating tokens:', error);
    }
  }

  async refresh(refreshTokenData: string) {
    const refreshPayload = await this.jwtService.verifyAsync(refreshTokenData, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    const payload = {
      userId: refreshPayload.userId,
      login: refreshPayload.login,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.REFRESH_EXPIRE,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
