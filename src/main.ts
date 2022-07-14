import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`🚀 The server is running on the port: ${port}`);
}
bootstrap();
