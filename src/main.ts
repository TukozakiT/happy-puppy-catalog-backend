import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:process.env.APP_WEB_URL
  });
  await app.listen(process.env.BACK_PORT);
}
bootstrap();
