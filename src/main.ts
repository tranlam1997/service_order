import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from './shared/pipes/validation.pipe'

async function bootstrap() {
  console.log(`hello : ${process.env.DB_USERNAME}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
