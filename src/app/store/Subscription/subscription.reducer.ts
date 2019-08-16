
import { CustomActions } from '../customActions';

import { SubscriptionActions } from '../../actions/subscription.actions';

export interface SubscriptionState {
  noData: boolean;
}

export const initialState: SubscriptionState = {
  noData: true
};

export function subscriptionReducer(state = initialState, action: CustomActions): SubscriptionState {
  switch (action.type) {
    case SubscriptionActions.GET_SUBCRIPTION: {
      return Object.assign({}, state, {noData: false});
    }
    default: {
      return state;
    }
  }
}
