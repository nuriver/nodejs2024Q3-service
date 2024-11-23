import { Module } from '@nestjs/common';
import { LoggingService } from './customLogger.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule {}
