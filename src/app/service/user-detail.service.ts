import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  _currentUser: string = '';
  _friends: any = [];

  constructor() { }

  get currentUser(): string {
    return this._currentUser;
  }

  set currentUser(user: string) {
    this._currentUser = user;
  }

  get friends(): string[] | undefined {
    return this._friends;
  }

  set friends(vals: string[] | undefined) {
    this._friends = vals;
  }

}
