import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingService } from './modules/customLogger/customLogger.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const loggingService = app.get<LoggingService>(LoggingService);
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  process.on('uncaughtException', (err) => {
    loggingService.error({
      message: err.message,
      stack: err.stack,
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.error({
      message: 'Unhandled Rejection at Promise',
      reason: reason instanceof Error ? reason.message : String(reason),
      statusCode: 500,
      timestamp: new Date().toISOString(),
      promise: promise,
    });
  });

  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `OpenApi documentation is available at http://localhost:${PORT}/doc`,
  );
}
bootstrap();
