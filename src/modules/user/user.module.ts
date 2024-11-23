import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma.module';
import { LoggerModule } from '../customLogger/customLogger.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, LoggerModule],
})
export class UserModule {}
