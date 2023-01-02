import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import { WebSocketServer } from '@nestjs/websockets/decorators';

@WebSocketGateway(3001, {
  cors: '/*',
  serveClient: true,
  namespace: '/',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id} ID`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id} ID`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('message', text);
  }
}
