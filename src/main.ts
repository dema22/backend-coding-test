import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Load environment variables early in the application startup
  require('dotenv').config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
