import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BaseResponse } from '../models/api-models/BaseResponse';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { CustomActions } from '../store/customActions';
import {SubscriptionService} from '../services/subscription.service';

@Injectable()
export class SubscriptionActions {
  public static GET_SUBCRIPTION = 'GET_SUBCRIPTION';
  public static GET_SUBCRIPTION_RESPONSE = 'GET_SUBCRIPTION_RESPONSE';
  @Effect()
  public createDueRange$: Observable<Action> = this.action$.pipe(ofType(SubscriptionActions.GET_SUBCRIPTION),
      switchMap((action: CustomActions) => this.subscriptionService.CreateAccount(action.payload)),
      map(response => this.CreateDueRangeResponse(response)));

  @Effect()
  public createDueRangeResponse$: Observable<Action> = this.action$.pipe(
    ofType(SubscriptionActions.GET_SUBCRIPTION_RESPONSE),
      map((action: CustomActions) => {
        const response = action.payload as BaseResponse<string, any>;
        if (response.status === 'error') {
          // this.toasty.errorToast(response.message, response.code);
          return {type: 'EmptyAction'};
        }
        // this.toasty.successToast('Due date range created successfully', 'Success');
        // set newly created company as active company
        return {type: 'EmptyAction'};
        // check if new uer has created first company then set newUserLoggedIn false
      }));


  constructor(
    private action$: Actions,
    private subscriptionService: SubscriptionService
  ) {
  }

  public CreateDueRange(value): CustomActions {
    return {
      type: SubscriptionActions.GET_SUBCRIPTION,
      payload: value
    };
  }

  public CreateDueRangeResponse(value): CustomActions {
    return {
      type: SubscriptionActions.GET_SUBCRIPTION_RESPONSE,
      payload: value
    };
  }
}
