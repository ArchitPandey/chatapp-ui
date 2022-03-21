import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../model/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  ws: any = {};
  wsBaseUrl: string = 'ws://localhost:8080/ws/v1/chat';
  httpBaseUrl: string = 'http://localhost:8080/api/v1/chat';

  constructor(private _http: HttpClient) {   }

  connect(user: string): WebSocketSubject<Message> {
    this.ws = webSocket(`${this.wsBaseUrl}/${user}`);
    return this.ws;
  }

  sendMessage(message: Message) {
    this.ws.next(message);
  }

  closeConnection() {
    this.ws.complete();
  }

  getFriendsFor(user: string): Promise<string[] | undefined> {
    return this._http.get<string[]>(`${this.httpBaseUrl}/friends/${user}`, {observe: 'body'})
    .toPromise();;
  }
}
