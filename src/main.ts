import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe} from './shared/pipes/validation.pipe'

async function bootstrap() {
  console.log(`hello : ${process.env.DB_USERNAME}`);
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Service Order')
    .setDescription('The Service Order API description')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('order/api', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
