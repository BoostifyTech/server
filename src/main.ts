import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const allowedOrigin = process.env.FRONTEND_URL;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
