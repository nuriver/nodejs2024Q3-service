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

    if (user && !correctPassword(user.password, pass)) {
      throw new ForbiddenException('Wrong password');
    }

    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
