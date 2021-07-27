import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://admin:lamngo123@cluster1.iyfdh.mongodb.net/shopping?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      },
    ),
    OrdersModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
