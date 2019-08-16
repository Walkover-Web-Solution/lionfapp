
import * as fromSubscriptions from './Subscription/subscription.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  subscriptions: fromSubscriptions.SubscriptionState;
}

export const reducers: ActionReducerMap<AppState> = {
  subscriptions: fromSubscriptions.subscriptionReducer,
};
