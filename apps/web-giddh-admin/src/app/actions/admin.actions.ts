import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BaseResponse } from '../models/api-models/BaseResponse';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { CustomActions } from '../store/customActions';
import { SubscriptionService } from '../services/subscription.service';
import { CommonPaginatedRequest, AdvanceSearchRequestSubscriptions } from '../modules/modules/api-modules/subscription';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class AdminActions {
  public static GET_SUBCRIPTION = 'GET_SUBCRIPTION';
  public static GET_SUBCRIPTION_RESPONSE = 'GET_SUBCRIPTION_RESPONSE';
  public static GET_SUBCRIPTION_ADVANCEDSEARCH = 'GET_SUBCRIPTION_ADVANCEDSEARCH';
  public static GET_SUBCRIPTION_AVANCEDSEARCH_RESPONSE = 'GET_SUBCRIPTION_AVANCEDSEARCH_RESPONSE';
  @Effect()
  public getSubscription$: Observable<Action> = this.action$.pipe(ofType(AdminActions.GET_SUBCRIPTION),
    switchMap((action: CustomActions) => {
      return this.subscriptionService.getAllSubscriptions(action.payload).pipe(
        map((response) => {
          return {
            type: AdminActions.GET_SUBCRIPTION_RESPONSE,
            payload: response
          }
        }))
    })
  );


  @Effect()
  public getSubscriptionResponse$: Observable<Action> = this.action$.pipe(
    ofType(AdminActions.GET_SUBCRIPTION_RESPONSE),
    map((action: CustomActions) => {
      const response = action.payload as BaseResponse<string, any>;
      if (response.status === 'error') {
        // this.toasty.errorToast(response.message, response.code);
        return { type: 'EmptyAction' };
      } else {
        console.log('store get all GET_SUBCRIPTION_RESPONSE ', response);
      }
      // set newly created company as active company
      return { type: 'EmptyAction' };
      // check if new uer has created first company then set newUserLoggedIn false
    }));
  @Effect()
  public getSubscriptionAdvancedSearch$: Observable<Action> = this.action$.pipe(ofType(AdminActions.GET_SUBCRIPTION_ADVANCEDSEARCH),
    switchMap((action: CustomActions) => {
      return this.subscriptionService.getAllSubscriptionsViaAdvancedSearch(action.payload).pipe(
        map((response) => {
          return {
            type: AdminActions.GET_SUBCRIPTION_AVANCEDSEARCH_RESPONSE,
            payload: response
          }
        }))
    })
  );


  @Effect()
  public getSubscriptionAdvancedSearchResponse$: Observable<Action> = this.action$.pipe(
    ofType(AdminActions.GET_SUBCRIPTION_AVANCEDSEARCH_RESPONSE),
    map((action: CustomActions) => {
      const response = action.payload as BaseResponse<string, any>;
      if (response.status === 'error') {
        // this.toasty.errorToast(response.message, response.code);
        return { type: 'EmptyAction' };
      }
      return { type: 'EmptyAction' };
    }));

  constructor(
    private action$: Actions,
    private subscriptionService: SubscriptionService,
    private toasty: ToasterService
  ) {
  }

  public getSubscription(model: CommonPaginatedRequest): CustomActions {
    return {
      type: AdminActions.GET_SUBCRIPTION,
      payload: model
    };
  }

  public getSubscriptionResponse(value): CustomActions {
    return {
      type: AdminActions.GET_SUBCRIPTION_RESPONSE,
      payload: value
    };
  }
  public getSubscriptionAdvancedSearch(filer: AdvanceSearchRequestSubscriptions): CustomActions {
    return {
      type: AdminActions.GET_SUBCRIPTION_ADVANCEDSEARCH,
      payload: filer
    };
  }

  public getSubscriptionAdvancedSearchResponse(value): CustomActions {
    return {
      type: AdminActions.GET_SUBCRIPTION_AVANCEDSEARCH_RESPONSE,
      payload: value
    };
  }
}
