import { Injectable } from '@angular/core';

@Injectable()
export class GeneralService {
  private _sessionId: string;

  constructor(){
  }
  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(sessionId: string) {
    this._sessionId = sessionId;
  }
}
