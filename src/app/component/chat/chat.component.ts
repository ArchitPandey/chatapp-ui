import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { ChatService } from 'src/app/service/chat.service';
import { UserDetailService } from 'src/app/service/user-detail.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentUser: string = '';
  currentFriend: string = '';
  messageText: string = '';
  friends : string[] = [];
  messageStore: Map<string, Message[]> = new Map<string, Message[]>();
  lastSeenStore: Map<string, Date> = new Map<string, Date>();
  lastFriend: string;

  constructor(private _chatService: ChatService,
    private _userDetailService: UserDetailService) {
      this.currentUser = this._userDetailService._currentUser;
      this.currentFriend = this._userDetailService._friends[0];
      this.friends = this._userDetailService._friends;
      this.lastFriend = this.currentFriend;
    }

  ngOnInit(): void {
    this._chatService.connect(this.currentUser).subscribe(
      {
        next: (msg) => {
          console.log(msg);
          if(!this.messageStore.has(msg.from)) {
            this.messageStore.set(msg.from, []);
          }
          this.messageStore.get(msg.from)?.push(msg);
        },
        error: (e) => {
          console.log(`error from ws ${e}`);
        }
      }
    )
  }

  sendMessage(): void {
    const msgToSend = {from: this.currentUser, to: this.currentFriend, message: this.messageText, timestamp: new Date().toJSON()};
    this._chatService.sendMessage(msgToSend);
    if(!this.messageStore.has(msgToSend.to)) {
      this.messageStore.set(msgToSend.to, []);
    }
    this.messageStore.get(msgToSend.to)?.push(msgToSend);
    this.messageText = '';
  }

  hasChatWithFriend(): boolean {
    const messagesWithCurrentFriend = this.messageStore.get(this.currentFriend);
    if (messagesWithCurrentFriend != undefined) {
      const len = messagesWithCurrentFriend.length;
      return (len > 0);
    } 

    return false;
  }

  onClickFriend(friend: string) {
    this.lastFriend = this.currentFriend;
    this.currentFriend = friend;

    this.lastSeenStore.set(this.lastFriend, new Date());
  }

  onFriendChangeClass(friend: string) : string {
    return this.currentFriend === friend ?
    "list-group-item list-group-item-action active friend-body"
    : "list-group-item list-group-item-action friend-body"
  }

  countUnreadMessages(friend: string): number {
    if( friend === this.currentFriend)
      return 0;

    if (this.messageStore.has(friend)) {
      const messagesWithFriend = this.messageStore.get(friend);
      const lastSeenTimeWithFriend = this.lastSeenStore.get(friend);

      if (messagesWithFriend === null || (messagesWithFriend === undefined) 
         || (lastSeenTimeWithFriend === null ) || (lastSeenTimeWithFriend === undefined)) {
        return 0;
      }
      
      return messagesWithFriend.filter( (m) => { 
        const msgTs = new Date(m.timestamp);
        return msgTs > lastSeenTimeWithFriend;
      } ).length;

    }
    return 0;
  }

}
