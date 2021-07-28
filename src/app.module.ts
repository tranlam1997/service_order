import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe} from './shared/pipes/validation.pipe'
import { DuplicateCheckingMiddleware } from './shared/middlewares/check-duplicate-user.middleware'
import { UserSchema } from './users/schemas/user.schema';


@Module({
  imports: [
    ConfigModule.forRoot({cache: true,}),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.iyfdh.mongodb.net/shopping?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      },
    ),
    OrdersModule,
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController],
  providers: [AppService,   {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DuplicateCheckingMiddleware)
      .forRoutes('/register');
  }
}
