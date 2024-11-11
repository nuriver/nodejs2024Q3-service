import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `OpenApi documentation is available at http://localhost:${PORT}/api`,
  );
}
bootstrap();
