import { Injectable } from '@angular/core';

@Injectable()
export class GeneralService {
  private _sessionId: string;
  private _user : object;

  constructor(){
  }
  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(sessionId: string) {
    this._sessionId = sessionId;
  }
  get user(): object {
    return this._user;
  }

  set user(user: object) {
    this._user = user;
  }
}
