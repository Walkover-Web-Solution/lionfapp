import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { CurrentPage } from '../modules/common';
import { GeneralActions } from '../actions/general/general.action';
import { AuthService } from '../theme/ng-social-login-module';

@Injectable()
export class GeneralService {
    private _sessionId: string;
    private _user: object;
    private pageTitle: string;

    constructor(private router: Router, private store: Store<AppState>, private _generalActions: GeneralActions, private authService: AuthService) {
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

    public setCurrentPageTitle(title) {
        let currentPageObj = new CurrentPage();
        currentPageObj.name = title;
        this.store.dispatch(this._generalActions.setPageTitle(currentPageObj));
    }

    get getCurrentPageTitle() {
        return this.pageTitle;
    }

    /**
     * Clear user session (logout action)
     *
     * @memberof GeneralService
     */
    public clearUserSession() {
        localStorage.removeItem('session');
        this.sessionId = null;
        this.user = null;
        this.authService.userSignOut();
        this.router.navigate(['login']);
    }

}
