
import * as fromAdmin from './Subscription/admin.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  subscriptions: fromAdmin.AdminState;
}

export const reducers: ActionReducerMap<AppState> = {
  subscriptions: fromAdmin.AdminReducer,
};
