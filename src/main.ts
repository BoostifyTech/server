import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//https://boosterclient.vercel.app
//for local http:/localhost:5000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
