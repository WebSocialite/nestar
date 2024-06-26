import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from "ws";
import { AuthService } from '../components/auth/auth.service';
import { Member } from '../libs/dto/member/member';
import * as url from 'url';

interface MessagePayload {
  event: string;
  text: string;
}

interface InfoPayload {
  event: string;
  totalClients: number;
}

@WebSocketGateway({transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketEventsGateway');
  private summaryClient: number = 0;


  constructor( private authService: AuthService) {}
  @WebSocketServer()
  server: Server;


  public afterInit(server: Server) {
    this.logger.verbose(`WebSocket Server Initialized & total: [${this.summaryClient}]`);
  }
  private async retrieveAuth(req: any): Promise<Member> {
    try {
      const parseUrl = url.parse(req.url, true);
      const {token} = parseUrl.query;
      return await this.authService.verifyToken(token as string);
    } catch (err) {
      return null;
    }
  }
  
  public async handleConnection(client: WebSocket, req: any) {
    const authMember = await this.retrieveAuth(req);
    console.log("authMember", authMember);
    // client => authMember 

    this.summaryClient++;
    this.logger.verbose(`Connection & total: [${this.summaryClient}]`);

    const infoMsg: InfoPayload = {
      event: 'info',
      totalClients: this.summaryClient,
    };
    this.emitMessage(infoMsg);
  }

  public async handleDisconnect(client: WebSocket) {
    this.summaryClient--;
    this.logger.verbose(`Disconnection & total: [${this.summaryClient}]`);

    const infoMsg: InfoPayload = {
      event: 'info',
      totalClients: this.summaryClient,
    };
    this.broadcastMessage(client, infoMsg);
  }

  @SubscribeMessage('message')
  public async handleMessage(client: WebSocket, payload: string): Promise<void> {
    const newMessage: MessagePayload = { event: 'message', text: payload };

    this.logger.verbose(`NEW MESSAGE: ${payload}`); //verbose bu terminaldegi web soket connectionni rangini blue qladi
    this.emitMessage(newMessage);
  }

  private broadcastMessage(sender: WebSocket, message: InfoPayload | MessagePayload) { // disconnet bulgan clientdan tashqari bulgan clientlarga sms yuborish logic 
    this.server.clients.forEach((client) => {
      if( client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
  private emitMessage(message: InfoPayload | MessagePayload) {  // butun ws ga ulangan clientga sms yubirish uchun qilingan mantiq
    this.server.clients.forEach((client) => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
  

}

