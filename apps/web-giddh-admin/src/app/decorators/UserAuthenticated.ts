import { AppState } from '../store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { userLoginStateEnum } from '../models/user-login-state';
import { ROUTES } from '../routes-array';
import { GeneralService } from '../services/general.service';

@Injectable()
export class UserAuthenticated implements CanActivate {
  constructor(public _router: Router, private store: Store<AppState>, private generalService : GeneralService) {
  }

  public canActivate(route: ActivatedRouteSnapshot) {
    let sessionId = this.generalService.sessionId;
    if(!sessionId){
      this._router.navigate(['login']);
    }
    return true;
  }
}
