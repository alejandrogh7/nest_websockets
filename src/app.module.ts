import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AppGateway } from './app/app.gateway';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ChatGateway,
    //  AppGateway
  ],
})
export class AppModule {}
