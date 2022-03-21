import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/service/chat.service';
import { UserDetailService } from 'src/app/service/user-detail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginModal', {static: true}) loginModal: any = {};
  loginModalReference: any;
  username: string = '';

  constructor(private _modalService: NgbModal,
    private _chatService: ChatService,
    private _userDetailService: UserDetailService,
    private _routerService: Router) { }

  ngOnInit(): void {
    this.loginModalReference = this._modalService.open(this.loginModal);
  }

  async login(): Promise<void> {
    this._userDetailService._friends = await this._chatService.getFriendsFor(this.username);
    
    this._userDetailService.currentUser = this.username;
    this.loginModalReference.close();
    this._routerService.navigate(["/chat"]);
  }

}
