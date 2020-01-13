import { Injectable } from '@angular/core';

@Injectable()
export class GeneralService {
  private _sessionId: string;
  private _user: object;
  private pageTitle: string;

  constructor() {
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
  public setCurrentPageTitle(url) {
    if (url) {
      let head = url.split('/admin/');
      console.log(head);
      this.pageTitle = head[1];
    }
  }
  get getCurrentPageTitle() {
    return this.pageTitle;
  }
}
