import { Component, OnInit } from '@angular/core';
import { Message } from './model/message';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatapp-ui';
}
