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
    public static GET_SUBSCRIPTION = 'GET_SUBSCRIPTION';
    public static GET_SUBSCRIPTION_RESPONSE = 'GET_SUBSCRIPTION_RESPONSE';
    public static GET_COMPANIES_BY_SUBSCRIPTION_ID = 'GET_COMPANIES_BY_SUBSCRIPTION_ID';
    public static GET_COMPANIES_BY_SUBSCRIPTION_ID_RESPONSE = 'GET_COMPANIES_BY_SUBSCRIPTION_ID_RESPONSE';
    public static GET_SUBSCRIPTION_ADVANCEDSEARCH = 'GET_SUBSCRIPTION_ADVANCEDSEARCH';
    public static GET_SUBSCRIPTION_AVANCEDSEARCH_RESPONSE = 'GET_SUBSCRIPTION_AVANCEDSEARCH_RESPONSE';
    @Effect()
    public getSubscription$: Observable<Action> = this.action$.pipe(ofType(AdminActions.GET_SUBSCRIPTION),
        switchMap((action: CustomActions) => {
            return this.subscriptionService.getAllSubscriptions(action.payload).pipe(
                map((response) => {
                    return {
                        type: AdminActions.GET_SUBSCRIPTION_RESPONSE,
                        payload: response
                    }
                }))
        })
    );


    @Effect()
    public getSubscriptionResponse$: Observable<Action> = this.action$.pipe(
        ofType(AdminActions.GET_SUBSCRIPTION_RESPONSE),
        map((action: CustomActions) => {
            const response = action.payload as BaseResponse<string, any>;
            if (response.status === 'error') {
                // this.toasty.errorToast(response.message, response.code);
                return { type: 'EmptyAction' };
            } else {
                //  
            }
            // set newly created company as active company
            return { type: 'EmptyAction' };
            // check if new uer has created first company then set newUserLoggedIn false
        }));
    @Effect()
    public getSubscriptionAdvancedSearch$: Observable<Action> = this.action$.pipe(ofType(AdminActions.GET_SUBSCRIPTION_ADVANCEDSEARCH),
        switchMap((action: CustomActions) => {
            return this.subscriptionService.getAllSubscriptionsViaAdvancedSearch(action.payload.model, action.payload.filter).pipe(
                map((response) => {
                    return {
                        type: AdminActions.GET_SUBSCRIPTION_AVANCEDSEARCH_RESPONSE,
                        payload: response
                    }
                }))
        })
    );


    @Effect()
    public getSubscriptionAdvancedSearchResponse$: Observable<Action> = this.action$.pipe(
        ofType(AdminActions.GET_SUBSCRIPTION_AVANCEDSEARCH_RESPONSE),
        map((action: CustomActions) => {
            const response = action.payload as BaseResponse<string, any>;
            if (response.status === 'error') {
                // this.toasty.errorToast(response.message, response.code);
                return { type: 'EmptyAction' };
            }
            return { type: 'EmptyAction' };
        }));
    // @Effect()
    // public getCompaniesBySubscriptionId$: Observable<Action> = this.action$.pipe(ofType(AdminActions.GET_COMPANIES_BY_SUBSCRIPTION_ID),
    //   switchMap((action: CustomActions) => {
    //     return this.subscriptionService.getAllCompaniesBySubscriptionId(action.payload.subscriptionId, action.payload.model).pipe(
    //       map((response) => {
    //         return {
    //           type: AdminActions.GET_COMPANIES_BY_SUBSCRIPTION_ID_RESPONSE,
    //           payload: response
    //         }
    //       }))
    //   })
    // );


    @Effect()
    public getCompaniesBySubscriptionIdResponse$: Observable<Action> = this.action$.pipe(
        ofType(AdminActions.GET_COMPANIES_BY_SUBSCRIPTION_ID_RESPONSE),
        map((action: CustomActions) => {
            const response = action.payload as BaseResponse<string, any>;
            if (response.status === 'error') {
                // this.toasty.errorToast(response.message, response.code);
                return { type: 'EmptyAction' };
            } else {
                //
            }
        }));
    constructor(
        private action$: Actions,
        private subscriptionService: SubscriptionService,
        private toasty: ToasterService
    ) {
    }

    public getSubscription(model: CommonPaginatedRequest): CustomActions {
        return {
            type: AdminActions.GET_SUBSCRIPTION,
            payload: model
        };
    }

    public getSubscriptionResponse(value): CustomActions {
        return {
            type: AdminActions.GET_SUBSCRIPTION_RESPONSE,
            payload: value
        };
    }
    public getSubscriptionAdvancedSearch(model: AdvanceSearchRequestSubscriptions, filter: CommonPaginatedRequest): CustomActions {
        return {
            type: AdminActions.GET_SUBSCRIPTION_ADVANCEDSEARCH,
            payload: { model, filter }
        };
    }

    public getSubscriptionAdvancedSearchResponse(value): CustomActions {
        return {
            type: AdminActions.GET_SUBSCRIPTION_AVANCEDSEARCH_RESPONSE,
            payload: value
        };
    }

    // public getCompaniesBySubscriptionId(subscriptionId, model: CommonPaginatedRequest): CustomActions {
    //   return {
    //     type: AdminActions.GET_COMPANIES_BY_SUBSCRIPTION_ID,
    //     payload: { subscriptionId, model }
    //   };
    // }

    public getCompaniesBySubscriptionIdResponse(value): CustomActions {
        return {
            type: AdminActions.GET_COMPANIES_BY_SUBSCRIPTION_ID_RESPONSE,
            payload: value
        };
    }
}
