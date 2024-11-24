import {
  forwardRef,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByLogin(login);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
