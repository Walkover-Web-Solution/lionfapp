import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { CurrentPage } from '../modules/common';
import { GeneralActions } from '../actions/general/general.action';

@Injectable()
export class GeneralService {
  private _sessionId: string;
  private _user: object;
  private pageTitle: string;

  constructor(private router: Router, private store: Store<AppState>, private _generalActions: GeneralActions) {
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
    let currentUrl = url;
    let currentPageObj = new CurrentPage();
    let title = currentUrl.split('/admin/');
    if (title.length === 2) {
      if (title[1].includes('/')) {
        let innerTitle = title[1].split('/');
        currentPageObj.name = innerTitle[0] + ' > ' + innerTitle[1]
      } else {
        currentPageObj.name = title[1];
      }

    } else if (title.length === 3) {
      currentPageObj.name = title[1] + '>' + title[2]
    }
    this.store.dispatch(this._generalActions.setPageTitle(currentPageObj));
  }

  get getCurrentPageTitle() {
    return this.pageTitle;
  }
}
