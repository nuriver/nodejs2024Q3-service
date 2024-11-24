import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma.module';
import { LoggerModule } from '../customLogger/customLogger.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, LoggerModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
